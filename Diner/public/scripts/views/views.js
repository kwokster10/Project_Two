// to view each category
var CategoryView = Backbone.View.extend({
	tagName: "div",
	className: "category-view",
	initialize: function(){
		console.log("categoryview init");
		_.bindAll(this, "render", "render_dish", "on_submit")
		// this.model.bind("change", this.render);
		// this.model.bind("reset", this.render);
		this.model.bind("sync", this.render);
		this.model.bind("add:dishes", this.render_dish);
		this.model.bind.fetch().done(function(){
			this.render();
		})
		// this.listenTo(this.model, "sync", this.render);
	},
	template: _.template($("#category-temp").html()),


	render: function(){
		this.$el.html(this.template({category: this.model}));
		return this;
	},

	events: {
		// separate to another form template
		"click input[type=submit]":"on_submit",
	},

	on_submit: function(e) {
		// also on new form view
		// also add validation
		// parseInt price?
		
		var newDish = new Dishes({
			name: this.$(".new-dish-name").val(),
			description: this.$(".new-dish-description").val(),
			image_url: this.$(".new-dish-image").val(),
			price: this.$(".new-dish-price").val(), 
			category_id: this.model.id
		});

		newDish.save();
		dinerRouter.navigate("#", true);
	},

	render_dish: function(dish){
		console.log("here at all?");
		var dishView = new DishView({model: dish});
		this.$("div.dishes-list").append($(dishView.render()));
		return this;
	}

});

var DishView = Backbone.View.extend({
	tagName: "div",
	className: "dish-view",
	initialize: function() {
		_.bindAll(this, "render");
		this.model.bind("change", this.render);
	},

	template: _.template($("#dish-temp").html()),

	render: function(){
		// check the template sending
		return $(this.el).html(this.template({dish: this.model.toJSON()}));
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
		console.log("hello");
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






