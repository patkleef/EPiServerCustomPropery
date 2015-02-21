using System.Collections.Generic;
using EPiServer.Core;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using EPiServerCustomProperty.Business.Services;

namespace EPiServerCustomProperty.Business.Properties
{
    [EditorDescriptorRegistration(TargetType = typeof(IEnumerable<ContentReference>), UIHint = "MultiPageProperty")]
    public class MultiPageDescriptor : EditorDescriptor
    {
        public MultiPageDescriptor()
        {
            ClientEditingClass = "app.editors.MultiPageProperty";
        }
    }
}