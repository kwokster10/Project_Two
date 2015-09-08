// setting up my router
var DinerRouter = Backbone.Router.extend({
	routes: {
		"": "allCats",
		"categories/:cid": "showCat",
		"*other": "showError"
	},

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
		category.fetch();
		var categoryView = new CategoryView({el: $("#content"), model: category});
	},

	// if user goes to non-existent page
	showError: function(){
		$("#content").html("<p>Invalid URL</p>").css({
			"color": "red",
			"margin-left": "15px",
			"font-size": "30px"
		}).append("<a href='/'>Home</a>");
	}
}); 

// starting the router
var dinerRouter = new DinerRouter();

// for bookmarkable url with relational
Backbone.history.start(function(){
	// removes all the relationships to avoid id error
	Backbone.Relational.store.removeModelScope(window);
});

