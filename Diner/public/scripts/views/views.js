// to view each category with all subsequent dishes
var CategoryView = Backbone.View.extend({
	tagName: "div",
	className: "category-view",

	initialize: function(){
		$("#truck").addClass("animated slideOutRight");
		console.log("categoryview init");
		_.bindAll(this, "render", "render_dish", "on_submit")
		this.model.bind("change", this.render);
		// this.model.bind("reset", this.render);
		this.model.bind("add:dishes", this.render_dish);
		this.render();
		// this.listenTo(this.model, "change", document.location.reload(true););
	},
	template: _.template($("#category-temp").html()),


	render: function(){
		console.log("render catView")
		this.$el.html(this.template({category: this.model}));
		return this;
	},

	events: {
		// listening for addition of new dish and when a category is deleted
		"click .new-dish-submit": "on_submit",
		"click #delete-cat": "deleteCat",
		"click #edit-cat": "editCat",
		"click #update-cat": "updateCat"
	},

	editCat: function(){
		$("#edit-cat-form").show();
	},

	updateCat: function(){
		this.model.set({
			name: $("#edit-category-name").val().trim()
		});

		this.model.save();
		dinerRouter.navigate("/", true);
		// document.location.reload(true);
	},

	// deleting a category
	deleteCat: function(){
		this.model.destroy();
		// works b/c listening to a remove event that triggers render
		dinerRouter.navigate("/", true);
		document.location.reload(true);
	},

	on_submit: function(e) {
		// also add validation
		
		// grabbing and saving new dish
		var newDish = new Dishes({
			name: this.$(".new-dish-name").val().trim(),
			description: this.$(".new-dish-description").val().trim(),
			image_url: this.$(".new-dish-image").val().trim(),
			price: this.$(".new-dish-price").val().trim(), 
			category_id: this.model.id
		});

		newDish.save();

		// calling on the method that appends dishes to view
		this.render_dish(newDish);
	},

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
		"keypress": "showOpts",
		"click .edit-dish": "editDish",
		"click .delete-dish": "deleteDish",
		"click .edit-dish-submit": "updateDish"
	},

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

	editDish: function(){
		$("#edit-dish-form"+this.model.id).show();
	},

	updateDish: function(){
		// validate; remember 2 decimal places
		var c_id = this.model.attributes.category_id;
		var d_id = this.model.id;
		
		this.model.set({
			name: $(".edit-dish-name"+d_id).val().trim(),
		    description: $(".edit-dish-description"+d_id).val().trim(),
		    image_url: $(".edit-dish-image"+d_id).val().trim(),
		    price: $(".edit-dish-price"+d_id).val().trim()
		});

		this.model.save();
      
		dinerRouter.navigate("#categories/"+c_id, {replace: false});
	},

	deleteDish: function(){
		this.model.destroy();
	},

	render: function(){
		return $(this.el).html(this.template({dish: this.model.toJSON()}));
	},

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
		// this.listenTo(this.collection, "remove", this.removeView);
	},

	template: _.template($("#categories-list-temp").html()),

	render: function(){
		console.log("catListRender");
		this.$el.empty();
		this.$el.html(this.template({categories: this.model.toJSON()}));
		return this;
	},

	events: {
		// add validation
		"click input.new-category": "on_submit",
		"click a": "refresh"
	},

	// nav is updated with address but view doesn't render
	// refreshes page to force rendering of view
	refresh: function(){
		document.location.reload(true);
	},

	// to add a category with a dish
	on_submit: function(e) {
		var category = new Categories({
			name: this.$(".new-category-name").val().trim()
		});


		console.log(category);
		console.log(category.attributes);
		console.log(category.attributes.name);
		console.log(category.get("id"));
		
		var _this = this;

		category.save({}, {
			success: function(catModel){
				console.log(catModel);

				var dish = new Dishes({
					name: this.$("input.dish-name").val().trim(),
					description: this.$("input.dish-description").val().trim(),
					image_url: this.$("input.dish-image").val().trim(),
					price: this.$("input.dish-price").val().trim(), 
					category_id: catModel.id
				});

				// clearing all of the fields
				$(".new-category-name").val("");
				$("input.dish-name").val("");
				$("input.dish-description").val("");
				$("input.dish-image").val("");
				$("input.dish-price").val("");

				// adding the category to the dom
				// has to be done before or all values disappear
				_this.model.add(catModel);

				dish.save({}, {
					success: function(){
						dinerRouter.navigate("/categories/"+catModel.id, {trigger: true});
					}
				});
		}});

	},

	// on_category_created: function(category, response) {
	// 	// how to change this so it adds to the end
	// 	// able to choose a location without deleting another?
	// 	this.model.add(category);
	// 	// trim the input vals? or do on validation?
	// 	// console.log(category);

	// 	// var dish = new Dishes({
	// 	// 	name: this.$("input.dish-name").val().trim(),
	// 	// 	description: this.$("input.dish-description").val().trim(),
	// 	// 	image_url: this.$("input.dish-image").val().trim(),
	// 	// 	price: this.$("input.dish-price").val().trim(), 
	// 	// 	category_id: category.fetch("id")
	// 	// });

	// 	// console.log(JSON.stringify(dish));

	// 	// console.log("190");

	// 	// dish.save({}, {
	// 	// 	success: function(){
	// 	// 		dinerRouter.navigate("categories/"+category.get("id"), {trigger: true});
	// 	// 	},
	// 	// 	error: this.on_error,
	// 	// });
	// },

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




