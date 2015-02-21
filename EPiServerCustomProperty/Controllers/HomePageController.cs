using System.Web.Mvc;
using EPiServer;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.Web.Mvc;
using EPiServerCustomProperty.Models.Pages;

namespace EPiServerCustomProperty.Controllers
{
    public class HomePageController : PageController<HomePage>
    {
        public ActionResult Index(HomePage currentPage)
        {
            var contentRepository = ServiceLocator.Current.GetInstance<IContentRepository>();

            if (currentPage.Pages != null)
            {
                foreach (var contentReference in currentPage.Pages)
                {
                    var page = contentRepository.Get<PageData>(contentReference);
                }
            }

            return View(currentPage);
        }
    }
}