var MenuCollection = Backbone.Collection.extend({
	url: "/categories",
	model: Categories
});

var DishesCollection = Backbone.Collection.extend({
	url: "/dishes",
	model: Dishes
});