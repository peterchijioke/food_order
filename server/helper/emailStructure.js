const emailStructure = (request, product) => {
  const { email, phone, name } = request.user;
  return {
    from: "no-reply@food-order.com",
    to: [`ayeesherh16@gmail.com`],
    subject: `Support system invitation`,
    text: `Hi, Ayeesher, ${name} placed an order.`,
    html: `<div style="
     display:block;
  justify-content: center;
    "><h1>Product ordered:</h1>
    Product Name: ${product?.name}<br/><br/>
    Price: ${product.price} <br/><br/> <br/>

    <h1>Product ordered is:</h1>
      Buyer Name: ${name}<br/><br/>
    Buyer Email: ${email} <br/><br/>
     Buyer phone: ${phone} <br/><br/>

   `,
  };
};

module.exports = emailStructure;
