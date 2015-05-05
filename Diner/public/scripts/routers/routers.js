// $(document).ready(function(){
var DinerRouter = Backbone.Router.extend({
	routes: {
		"categories/:id": "showCat",
		"": "allCats"
		// "categories": "allCats"
		// "/dishes": 
		// "/dishes/:dId": 
		// "*other": "showError"
	},

	// showing all categories--fetch the categories collection 
	// send values to CategoryListView
	allCats: function(){
		var catsCollection = new MenuCollection();
		var catsListView = new CategoryListView({el: $("#content"), model: catsCollection});
		catsCollection.fetch();

	},

	// showing each category which will grab all dishes related to it
	showCat: function(id){
		var category = new Categories({id: id});
		var categoryView = new CategoryView({el: $("#content"), model: category});
		category.fetch();
	}
}); 

var dinerRouter = new DinerRouter();
// for regular looking routes in supported browsers; bookmarkable links
Backbone.history.start();
// });
