// defining my relational models

// categories model
var Categories = Backbone.RelationalModel.extend({
	urlRoot: "/categories",
	validation: {
		name: {required: true}
	},
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

// dishes model
var Dishes = Backbone.RelationalModel.extend({
	urlRoot: "/dishes",
	collectionType: "DishesCollection",
	validation: {
		name: {required: true},
		description: {required: true},
		image_url: {required: true},
		price: {min: 1}
	},
	initialize: function() {
		console.log("dish created");
		this.on("change", function(){
			console.log("dish change made");
		});

	}
});


