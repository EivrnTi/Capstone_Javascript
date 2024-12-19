const baseUrl = "https://672cb9ed1600dda5a9f9a708.mockapi.io";

export class Service {
  getPhones = async () => {
    try {
      const res = await axios({
        url: "${{baseUrl}/CapstoneJS",
        method: "GET",
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  getPhoneById = async (id) => {
    try {
      const res = await axios({
        url: `${baseUrl}/CapstoneJS/${id}`,
        method: "GET",
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
}
