  using System;
  //using System.ServiceModel;
  //using System.ServiceModel.Web;
  //using System.ServiceModel.Activation;
  using System.Collections.Generic;
	using System.Linq;
	using System.Text;
	using System.Threading.Tasks;
	using System.Xml.Serialization;
	using System.Xml;
	using System.Xml.Linq;
	using System.IO;
	using WebClassLibraty;
	
namespace Terrasoft.Configuration
{
	using System.ServiceModel;
	using System.ServiceModel.Web;
	using System.ServiceModel.Activation;
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class CustomConfigurationService
	{
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
		ResponseFormat = WebMessageFormat.Json)]
        public string GetCurs(string inputDate, string comboBox)
        {
    		string result = "0"; //курс
            string valute = ""; //код валюты
            DailyInfo di = new DailyInfo();
            DateTime date = new DateTime(1970, 1, 2);
            date = date.AddHours(double.Parse(inputDate));
            string val = "UAH";
            val = comboBox;
            var Ds = di.GetCursOnDate(date);
            string sourceXml = Ds.GetXml(); //accept XML
            List<string> xmllist = new List<string>();
            XDocument ob = XDocument.Parse(sourceXml);
            var a = from x in ob.Descendants("ValuteCursOnDate")
                    where x.Descendants("VchCode").First().Value == val
                    select new
                    { 
                            Vname = x.Descendants("VchCode").First().Value,
                            Kurs = x.Descendants("Vcurs").First().Value
                    };
            foreach (var kur in a)
            {
                result = kur.Kurs;
            }
        	return result;
        }
    }
}
