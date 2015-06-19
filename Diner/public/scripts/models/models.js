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
		name: {
			required: true, 
			minLength: 3, 
			msg: "Please enter a name for your dish."},
		description: {
			required: true, 
			minLength: 3, 
			msg: "Tell your customers about your dish."},
		image_url: {
			required: true,
			pattern: url, 
			msg: "Please enter a valid image url."},
		price: {
			min: 1,
			msg: "The price needs to be greater than 1."}
	},
	initialize: function() {
		console.log("dish created");
		this.on("change", function(){
			console.log("dish change made");
		});

	}
});


