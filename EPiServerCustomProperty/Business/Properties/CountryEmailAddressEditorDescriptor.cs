using System.Collections.Generic;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using EPiServerCustomProperty.Business.Services;

namespace EPiServerCustomProperty.Business.Properties
{
    [EditorDescriptorRegistration(TargetType = typeof(IEnumerable<CountryEmailAddress>), UIHint = "CountryEmailAddressesProperty")]
    public class CountryEmailAddressEditorDescriptor : EditorDescriptor
    {
        public CountryEmailAddressEditorDescriptor()
        {
            var countryService = new CountryService();

            ClientEditingClass = "app.editors.CountryEmailAddressesProperty";

            EditorConfiguration["Countries"] = countryService.GetAll();
        }
    }
}