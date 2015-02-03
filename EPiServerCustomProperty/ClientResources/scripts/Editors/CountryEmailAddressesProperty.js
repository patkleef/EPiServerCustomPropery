define([
    "dojo/_base/array",
    "dojo/_base/declare",

    "dijit/registry",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_Container",
    "dojox/layout/TableContainer",
    "dijit/form/ValidationTextBox",
    "dojo/text!./templates/CountryEmailAddresses.html"
],
function (
    array,
    declare,

    registry,
    _Widget,
    _TemplatedMixin,
    _Container,
    TableContainer,
     ValidationTextBox,
    template
) {
    return declare("app.editors.CountryEmailAddressesProperty", [
        _Widget,
        _TemplatedMixin,
        _Container], {
            templateString: template,
            postCreate: function () {

                var layout = new TableContainer({
                    showLabels: true,
                    orientation: "horiz"
                });

                for (var i = 0; i < this.countries.length; i++) {
                    var textBox = new ValidationTextBox({
                        name: "id_" + this.countries[i].code,
                        id: this.countries[i].code,
                        type: "text",
                        class: "countryEmailTextbox",
                        title: this.countries[i].name,
                        invalidMessage: "The entered value is not valid. Must be a valid e-mail.",
                        regExp: "^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                    });
                    layout.addChild(textBox);
                }
                this.container.appendChild(layout.domNode);
            },
            _getValueAttr: function () {
                var jsonObject = [];
                var textboxCollection = dojo.query(".countryEmailTextbox");

                for (var i = 0; i < textboxCollection.length; i++) {

                    if (textboxCollection[i] != null) {

                        var widget = registry.byNode(textboxCollection[i]);

                        var item = {
                            CountryCode: widget.id,
                            EmailAddress: widget.get("value")
                        }

                        jsonObject.push(item);
                    }
                }
                return jsonObject;
            },
            _setValueAttr: function (val) {
                if (val != null) {
                    for (var i = 0; i < val.length; i++) {
                        var widget = registry.byId(val[i].countryCode);
                        if (widget != null) {
                            widget.set("value", val[i].emailAddress);
                        }
                    }
                }
            },
            isValid: function () {
                var isValid = true;
                var textboxCollection = dojo.query(".countryEmailTextbox");

                for (var i = 0; i < textboxCollection.length; i++) {

                    if (textboxCollection[i] != null) {

                        var widget = registry.byNode(textboxCollection[i]);
                        isValid = isValid && widget.isValid();
                    }
                }
                return isValid;
            }
        }
    );
});