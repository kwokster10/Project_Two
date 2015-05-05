var Categories = Backbone.RelationalModel.extend({
	urlRoot: "/categories",
	idAttribute: "id",
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
	idAttribute: "id",
	initialize: function() {
		console.log("dish created");
		this.on("change", function(){
			console.log("change made");
		});
	}
});