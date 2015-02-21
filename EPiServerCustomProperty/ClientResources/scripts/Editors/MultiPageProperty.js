define([
     "dijit",
     "dojo",
     "dojo/_base/declare",
     "dojo/_base/lang",
     "dojo/when",
     "dojo/dom-construct",
     "dojo/_base/array",
     "dojo/query",

    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "epi-cms/widget/_HasChildDialogMixin",
    
    "epi/dependency",
    "epi-cms/widget/ContentSelectorDialog",
    "epi/shell/widget/dialog/Dialog",

    "dojo/text!./templates/MultiPage.html"
], function (
    dijit,
    dojo,
    declare,
    lang,
    when,
    domConstruct,
    array,
    query,

    _Widget,
    _TemplatedMixin,
    _HasChildDialogMixin,

    dependency,
    ContentSelectorDialog,
    Dialog,

    template
) {
    return declare("app.editors.MultiPageProperty", [
        _Widget,
        _TemplatedMixin,
        _HasChildDialogMixin
    ], {
        _tableNode: null,
        templateString: template,
        postCreate: function () {
            if (this.value == null) {
                this.value = [];
            }
            this.tableNode = domConstruct.create("table", {
                className: "selectedPagesTable"
            });
            var colgroup = domConstruct.create("colgroup");
            colgroup.appendChild(domConstruct.create("col", {
                width: "200"
            }));
            colgroup.appendChild(domConstruct.create("col", {
                width: "50"
            }));
            this.tableNode.appendChild(colgroup);
            this.container.appendChild(this.tableNode);

            this._buildTableRows();
        },

        _buildTableRows: function () {
            array.forEach(this.value, function (item) {
                var page = this._getContentData(item);
                this._addRowElementToTable(item, page.name);
            }, this);
        },

        _addRowElementToTable: function (pageId, pageName) {
            var button = domConstruct.create("div",
            {
                id: "removeButton_" + pageId,
                className: "removeButton",
                click: dojo.hitch(this, function (event) {
                    this._removeFromValue(event);
                })
            });
            var newRow = domConstruct.create("tr");
            var newColl1 = domConstruct.create("td",
            {
                innerHTML: pageName
            });
            var newColl2 = domConstruct.create("td");
            newColl2.appendChild(button);

            newRow.appendChild(newColl1);
            newRow.appendChild(newColl2);

            this.tableNode.appendChild(newRow);
        },

        _onAddButtonClick: function(event) {
            var contentRepositoryDescriptors = this.contentRepositoryDescriptors || dependency.resolve("epi.cms.contentRepositoryDescriptors");
            this.roots = contentRepositoryDescriptors["pages"].roots;
            this.isShowingChildDialog = true;

            this.contentSelectorDialog = new ContentSelectorDialog({
                canSelectOwnerContent: false,
                showButtons: false,
                roots: this.roots,
                allowedTypes: ["episerver.core.icontentdata"],
                showAllLanguages: true
            });

            this.dialog = new Dialog({
                title: "Select a page",
                dialogClass: "epi-dialog-portrait",
                content: this.contentSelectorDialog,
                destroyOnHide: true
            });

            this.connect(this.dialog, "onExecute", "_onDialogExecute");
            this.connect(this.dialog, 'onHide', '_onDialogHide');

            this.isShowingChildDialog = true;
            this.dialog.show();
        },

        _onDialogExecute: function () {
            var contentSelectorValue = this.contentSelectorDialog.get("value");

            if (array.indexOf(this.value, contentSelectorValue) == -1) {
                var page = this._getContentData(contentSelectorValue);
                when(page, lang.hitch(this, function (p) {

                    this._addRowElementToTable(contentSelectorValue, p.name);

                    this.value.push(contentSelectorValue);
                }));

                this.onChange(this.value);
            }
        },

        _onDialogHide: function () {
            this.isShowingChildDialog = false;
        },

        _getContentData: function(contentlink) {
            var registry = dependency.resolve("epi.storeregistry");
            var store = registry.get("epi.cms.content.light");
            if (!contentlink) {
                return null;
            }

            var contentData;
            dojo.when(store.get(contentlink), function (returnValue) {
                contentData = returnValue;
            });
            return contentData;
        },

        _removeFromValue: function (event) {
            // remove from property value
            var button = event.srcElement;
            
            var id = button.id.split("_")[1];

            this.value.splice(this.value.indexOf(id), 1);

            // remove row from table
            var row = query(button).closest("tr");
            row.remove();

            this.onChange(this.value);
        }
    });
});