// var  Person = Backbone.Model.extend();
// var person = new Person();
// person.set({ fname: "F_name", lname:"L_name"});  
// document.write("What's my name: ", person.get('fname'));
/* // Models
var model = Backbone.Model.extend({

    defaults: {
        name: 'is some name'
    },
    initialize: function() {
        this.bindEvents()
    },
    bindEvents: function() {
        this.on('change:name', (model) => {
            alert(`from ${this.get('name')} name changed to ${model.get('name')}`)
        })
    }
});
var myModel = new model();
setTimeout(() => {
    myModel.set({'name': 'is any name'})
}, 1000);
*/

view = Backbone.View.extend({
    tagName: 'div',
    className: "test-div",
    id: 'test-div',
    default: {
    },
    initialize: (/* options */) => {
        // options.el.append(' here we go el')
    }
});

// var myView = new view({
//     el: $('#unique')
// });

var myView = new view({});
console.log(myView.el);
console.log(myView.$el);