// var Categories = Backbone.Model.extend({
// 	urlRoot: "/categories",
// 	// idAttribute: "id",
// });

// var Dishes = Backbone.Model.extend({
// 	urlRoot: "/dishes",
// 	// idAttribute: "id",
// 	initialize: function() {
// 		console.log("dish created");
// 		this.on("change", function(){
// 			console.log("change made");
// 		});
// 	}
// });
var Categories = Backbone.RelationalModel.extend({
	urlRoot: "/categories",
	// idAttribute: "id",
	relations: [{
		type: Backbone.HasMany, 
		key: "dishes", 
		relatedModel: "Dishes",
		collectionType: "MenuCollection",
		reverseRelation: {
			key: "categories",
			includeInJSON: "id"
		}
	}]
});

var Dishes = Backbone.RelationalModel.extend({
	urlRoot: "/dishes",
	// idAttribute: "id",
	collectionType: "DishesCollection",
	initialize: function() {
		console.log("dish created");
		this.on("change", function(){
			console.log("dish change made");
		});
	}
});


