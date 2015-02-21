using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using EPiServer.Core;
using EPiServer.PlugIn;

namespace EPiServerCustomProperty.Business.Properties
{
    [PropertyDefinitionTypePlugIn(Description = "A property for list of content reference.", DisplayName = "Multi page property")]
    public class PropertyMultiPage : PropertyLongString
    {
        public override Type PropertyValueType
        {
            get { return typeof(IEnumerable<ContentReference>); }
        }

        public override object Value
        {
            get
            {
                var value = base.Value as string;
                if (value == null)
                {
                    return null;
                }
                var serializer = new JavaScriptSerializer();
                return serializer.Deserialize(value, typeof(IEnumerable<ContentReference>));
            }
            set
            {
                if (value is IEnumerable<ContentReference>)
                {
                    var serializer = new JavaScriptSerializer();
                    base.Value = serializer.Serialize(value);
                }
                else
                {
                    base.Value = value;
                }
            }
        }

        public override object SaveData(PropertyDataCollection properties)
        {
            return LongString;
        }
    }
}