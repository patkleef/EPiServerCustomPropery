using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServerCustomProperty.Business.Properties;

namespace EPiServerCustomProperty.Models.Pages
{
    [ContentType(DisplayName = "HomePage", GUID = "7ebe70a6-bae0-486d-bc73-8dde58861415", Description = "")]
    public class HomePage : PageData
    {
        [UIHint("CountryEmailAddressesProperty")]
        [Display(
            Name = "Country email addresses",
            Description = "Country email addresses",
            GroupName = SystemTabNames.Content,
            Order = 10)]
        [BackingType(typeof(PropertyCountryEmailAddress))]
        public virtual IEnumerable<CountryEmailAddress> CountryEmailAddresses { get; set; }

        [UIHint("MultiPageProperty")]
        [Display(
            Name = "Pages",
            Description = "Select multiple pages",
            GroupName = SystemTabNames.Content,
            Order = 20)]
        [BackingType(typeof(PropertyMultiPage))]
        public virtual IEnumerable<ContentReference> Pages { get; set; }
    }
}