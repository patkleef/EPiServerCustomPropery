using System.Collections.Generic;

namespace EPiServerCustomProperty.Business.Services
{
    public interface ICountryService
    {
        IEnumerable<Country> GetAll();
    }
}