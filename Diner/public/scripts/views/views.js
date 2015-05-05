// to view each category
var CategoryView = Backbone.View.extend({
	tagName: "div",
	className: "category-view",
	initialize: function(){
		console.log("categoryview init");
		_.bindAll(this, "render", "render_dish", "addOne", "addAll", "on_submit")
		this.model.bind("change", this.render);
		this.model.bind("reset", this.render);
		this.model.bind("sync", this.render);
		this.model.bind("add:dishes", this.render_dish);
		// this.model.bind.fetch().done(function(){
		// 	this.render();
		// })
		// this.listenTo(this.model, "sync", this.render);
		this.dishes = new DishesCollection();
		this.dishes.bind("reset", this.addAll);
		this.dishes.fetch();
	},

	template: _.template($("#category-temp").html()),

	addAll: function(){
		this.dishes.each(this.addOne);
	},

	addOne: function(dish){
		console.log("addOne");
		var dishView = new DishView({model: dish});
		this.$("div.dishes-list").append(dishView.render().el);
	},

	render: function(){
		console.log("render catView")
		this.$el.html(this.template({category: this.model}));
		return this;
	},

	events: {
		// separate to another form template
		"click .new-dish-submit": "on_submit"
	},

	on_submit: function(e) {
		// also add validation
		
		var newDish = new Dishes({
			name: this.$(".new-dish-name").val().trim(),
			description: this.$(".new-dish-description").val().trim(),
			image_url: this.$(".new-dish-image").val().trim(),
			price: this.$(".new-dish-price").val().trim(), 
			category_id: this.model.id
		});

		newDish.save();
		// dinerRouter.navigate("/", true);
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
		this.model.bind("change", this.render);
		this.model.bind("remove", this.removeView);
		this.model.bind("reset", this.render);
		// this.listenTo(this.model, "change", this.render);
		// this.listenTo(this.model, "remove", this.removeView);
	},

	template: _.template($("#dish-temp").html()),

	events: {
		"keydown .body-content": "showOpts",
		"click .edit-dish": "editDish",
		"click .delete-dish": "deleteDish",
		"click .edit-dish-submit": "updateDish"
	},

	showOpts: function(e){
		console.log("keydown "+e)
		// toggle display hide and show
		if (e.shiftKey && e.altKey && e.keyCode == 101) {
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
	tagName: "li",
	className: "category-list-view", 
	initialize: function(){
		_.bindAll(this, "render", "render_category_summary", "on_submit", "on_category_created", "on_error");
		this.model.bind("reset", this.render);
		this.model.bind("change", this.render);
		this.model.bind("add", this.render_category_summary);
	},

	template: _.template($("#categories-list-temp").html()),

	render: function(){
		console.log("catListRender");
		// think I will need to pass {category: this.model.toJSON}?
		this.$el.html(this.template({category: this.model.toJSON()}));
		this.model.forEach(this.render_category_summary);
		return this;
	},

	events: {
		// add validation
		"click input[type=submit]": "on_submit"
	},

	render_category_summary: function(category){
		// what is category here? is it actually being passed categories?
		console.log("catListSumRender");
		var categorySumView = new CategorySumView({model: category});
		this.$el.find("ul.categories-list").html(this.template({categories: this.model.toJSON()}));
	},

	// currently commented out in html
	on_submit: function(e) {
		var category = new Categories({
			name: this.$(".new-category-name").val()
		});
		category.save({}, {success: this.on_category_created, error: this.on_error});
	},

	on_category_created: function(category, response) {
		// how to change this so it adds to the end
		// able to choose a location without deleting another?
		this.model.add(category, {at: 0});
		// trim the input vals? or do on validation?
		var dish = new Dishes({
			name: this.$(".new-dish-name").val(),
			description: this.$(".new-dish-desciption").val(),
			image_url: this.$(".new-dish-image").val(),
			// do I need to parseInt this or will sql do automatically
			price: this.$(".new-dish-price").val(), 
			category: category.get("id")
		});

		category.save({}, {
			success: function(){
				dinerRouter.navigate("categories/"+category.get("id"), {trigger: true});
			},
			error: this.on_error,
		});
	},

	on_error: function(model, response){
		var error = $.parseJSON(response.responseText);
		this.$(".error-message").html(error.message);
	}
});

// for each category to render
var CategorySumView = Backbone.View.extend({
	tagName: "li",
	className: "category-sum-view", 
	initialize: function(){
		_.bindAll(this, "render", "on_click");
		this.model.bind("change", this.render);
	},

	template: _.template($("#category-sum-temp").html()),

	render: function(){
		console.log("here?");
		// check the {model} sent
		// console.log(this.model.toJSON());
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},

	events: {
		"click": "on_click"
	},

	on_click: function(e){
		dinerRouter.navigate("categories/"+this.model.get("id"), {trigger: true});
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




