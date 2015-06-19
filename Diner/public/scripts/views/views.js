// to view one category with all related dishes
var CategoryView = Backbone.View.extend({
	tagName: "div",
	className: "category-view",

	initialize: function(){
		$("#truck").addClass("animated slideOutRight");
		
		_.bindAll(this, "render", "render_dish", "on_submit")
		this.model.bind("change", this.render);
		this.model.bind("add:dishes", this.render_dish);
	},
	template: _.template($("#category-temp").html()),

	// renders the category the dishes belong to
	render: function(){
		this.$el.html(this.template({category: this.model}));
		return this;
	},

	// listening for addition of new dish and when a category is deleted or updated
	events: {
		"click .new-dish-submit": "on_submit",
		"click #delete-cat": "deleteCat",
		"click #edit-cat": "editCat",
		"click #update-cat": "updateCat"
	},

	// showing the edit category form
	editCat: function(){
		$("#edit-cat-form").show();
	},

	// edits a category
	updateCat: function(){
		this.model.set({
			name: $("#edit-category-name").val().trim()
		});

		// saving updated category
		this.model.save();
		// rerouting to main page b/c dishes need to be grabbed
		dinerRouter.navigate("/", true);
		// document.location.reload(true);
	},

	// deleting a category 
	deleteCat: function(){
		this.model.destroy();
		// works b/c listening to a remove event that triggers render
		dinerRouter.navigate("/", true);
		// forcing reload to get to my page
		document.location.reload(true);
	},

	// runs when submit button for new dish creation gets clicked
	on_submit: function(e) {
		// add validation here
		
		// grabbing and saving new dish
		var newDish = new Dishes({
			name: this.$(".new-dish-name").val().trim(),
			description: this.$(".new-dish-description").val().trim(),
			image_url: this.$(".new-dish-image").val().trim(),
			price: this.$(".new-dish-price").val().trim(), 
			category_id: this.model.id
		});

		// clearing input fields
		$(".new-dish-name").val("");
		$(".new-dish-description").val("");
		$(".new-dish-image").val("");
		$(".new-dish-price").val("");

		newDish.Backbone.Validation.extend({
			model: newDish
		});
		newDish.validate();
		newDish.bind('validated', function(isValid, mode, errors){
			if(isValid === true){
				thisView.collection.create(jserDish); 
				dishRoutes.navigate('#dishes',true);
			}else{
				Object.keys(errors).forEach(function(key){
					$('.errorMsg').append("<br>"+errors[key]); 
				});
			}
		});

		// calling on the method that appends dishes to view
		this.render_dish(newDish);
	},

	// shows the dishes related to the category
	render_dish: function(dish){
		console.log("render_dish here");
		var dishView = new DishView({model: dish});
		this.$("div.dishes-list").append($(dishView.render()));
		return this;
	}
});

// all the dishes in a category
var DishView = Backbone.View.extend({
	tagName: "div",
	className: "dish-view",
	initialize: function() {
		_.bindAll(this, "render", "removeView");
		// this.model.bind("change", this.render);
		// this.model.bind("remove", this.removeView);
		// this.model.bind("reset", this.render);
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model, "remove", this.removeView);
	},

	template: _.template($("#dish-temp").html()),

	events: {
		"keydown": "showOpts",
		"click .edit-dish": "editDish",
		"click .delete-dish": "deleteDish",
		"click .edit-dish-submit": "updateDish"
	},

	// trying to get forms and buttons to show up on keydown
	showOpts: function(e){
		console.log("keydown "+e)
		// toggle display hide and show
		if (e.shiftKey && e.altKey && e.keyCode == 69) {
		  alert("Hello Rick!");
			$(".edit-dish").show();
			$(".delete-dish").show();
			$("#add-dish-form").show();
		}
	},

	// showing the edit form 
	editDish: function(){
		$("#edit-dish-form"+this.model.id).show();
	},

	// updating a dish
	updateDish: function(){
		// validate; remember 2 decimal places
		var d_id = this.model.id;
		
		// grabbing updated values to dish
		this.model.set({
			name: $(".edit-dish-name"+d_id).val().trim(),
		    description: $(".edit-dish-description"+d_id).val().trim(),
		    image_url: $(".edit-dish-image"+d_id).val().trim(),
		    price: $(".edit-dish-price"+d_id).val().trim()
		});

		this.model.save();
	},

	// deleting a dish
	deleteDish: function(){
		this.model.destroy();
	},

	render: function(){
		return $(this.el).html(this.template({dish: this.model.toJSON()}));
	},

	// try adding remove to listenTo and check if it works
	removeView: function(){
		this.remove();
	}
});

// calling all the categories
var CategoryListView = Backbone.View.extend({
	tagName: "div",
	className: "each-category",
	
	initialize: function(){
		_.bindAll(this, "render", "on_submit", "on_error");
		this.model.bind("reset", this.render);
		this.model.bind("change", this.render);
		this.model.bind("add", this.render);
	},

	template: _.template($("#categories-list-temp").html()),

	render: function(){
		// this.$el.empty();
		this.$el.html(this.template({categories: this.model.toJSON()}));
		return this;
	},

	events: {
		// add validation
		"click input.new-category-submit": "on_submit",
		"click a": "refresh"
	},

	// nav is updated with address but view doesn't render
	// refreshes page to force rendering of view
	refresh: function(){
		document.location.reload(true);
	},

	// to add a category with a dish
	on_submit: function(e) {
		// creating new category and grabbing value
		var category = new Categories({
			name: this.$(".new-category-name").val().trim()
		});

		// allows category to grab this instance of model in save()
		var _this = this;

		category.save({}, {
			success: function(catModel){
				console.log("reaching?")
				// storing values for new dish
				var dish = new Dishes({
					name: this.$("input.dish-name").val().trim(),
					description: this.$("input.dish-description").val().trim(),
					image_url: this.$("input.dish-image").val().trim(),
					price: this.$("input.dish-price").val().trim(), 
					category_id: catModel.id
				});

				// clearing all of the input fields
				$(".new-category-name").val("");
				$("input.dish-name").val("");
				$("input.dish-description").val("");
				$("input.dish-image").val("");
				$("input.dish-price").val("");

				// adding the category to the dom
				// has to be done after dish or all values disappear
				_this.model.add(catModel);

				dish.save({}, {
					success: function(){
						dinerRouter.navigate("/categories/"+catModel.id, {trigger: true});
					}
				});
		}});

	},

	// to handle error messages
	on_error: function(model, response){
		var error = $.parseJSON(response.responseText);
		this.$(".error-message").html(error.message);
	}
});



// keycodes: 
// e = 101
// c = 99
// d = 100
// E = 69
// D = 68
// A = 65
// a = 97




