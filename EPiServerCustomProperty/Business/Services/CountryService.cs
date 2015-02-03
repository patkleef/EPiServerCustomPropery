using System.Collections.Generic;

namespace EPiServerCustomProperty.Business.Services
{
    public class CountryService : ICountryService
    {
        private List<Country> _countries;
        
        public CountryService()
        {
            _countries = new List<Country>();

            _countries.Add(new Country { Code = "nl", Name = "Netherlands"});
            _countries.Add(new Country { Code = "be", Name = "Belgium" });
            _countries.Add(new Country { Code = "se", Name = "Sweden" });
        }
        
        public IEnumerable<Country> GetAll()
        {
            return _countries;
        }
    }
}