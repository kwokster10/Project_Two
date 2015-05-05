// $(document).ready(function(){
var DinerRouter = Backbone.Router.extend({
	routes: {
		"categories/:cid": "showCat",
		"": "allCats"
		// "categories": "allCats"
		// "/dishes": "addDishes"
		// "/dishes/:dId": 
		// "*other": "showError"
	},

	// addDishes: function(){
	// 	var dishesCollection = new DishesCollection();
	// 	var dishesView = new DishView
	// },

	// showing all categories--fetch the categories collection 
	// send values to CategoryListView
	allCats: function(){
		var catsCollection = new MenuCollection();
		var catsListView = new CategoryListView({el: $("#content"), model: catsCollection});
		catsCollection.fetch();

	},

	// showing each category which will grab all dishes related to it
	showCat: function(cid){
			var category = Categories.findOrCreate({id: cid});
		// 	var complete = _.invoke([category], "fetch");
		// $.when.apply($, complete).done(function(){
			category.fetch();
			var categoryView = new CategoryView({el: $("#content"), model: category});
				
		// });
	}
}); 

// starting the router
var dinerRouter = new DinerRouter();

// for bookmarkable url with relational
Backbone.history.start(function(){
	// removes all the relationships to avoid id error
	Backbone.Relational.store.removeModelScope(window);
});

