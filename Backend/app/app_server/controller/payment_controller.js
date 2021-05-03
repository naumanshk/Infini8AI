var payment_schema = require('../models/payment_model');
const stripe = require("stripe")("sk_test_HCShLCTnWQZR5ewTwaA9FihA00h40oO8oS");
var HashMap = require('hashmap');
const {uuid} = require("uuidv4");
const uniqid = require("uniqid");
const { Hash } = require('crypto');
var payment_controller = {


  tokenize:(req,res)=>{
    // stripe.apiKey = "sk_test_HCShLCTnWQZR5ewTwaA9FihA00h40oO8oS";

    
    console.log("naumand")
    // var cards=new HashMap(); 
 
    // cards.set("number", "4242424242424242");
    // cards.set("exp_month", 6);
    // cards.set("exp_year", 2021);
    // cards.set("cvc", "314");

    // console.log(cards._data)
    // var params=new HashMap(); 
    // card={}
    //  params.set(card, cards);
    // console.log(params._data)
    var stripe = require('stripe')('sk_test_HCShLCTnWQZR5ewTwaA9FihA00h40oO8oS');

    stripe.tokens.create(
      {
        card: {
          number: '4242424242424242',
          exp_month: 6,
          exp_year: 2021,
          cvc: '314',
        },
      },
      function(err, token) {
        res.json(token)
      }
    );
    // console.log(token)
  },

  nauman:(req,res)=>{
    console.log("Request:", req.body);
    var payment =new payment_schema(req.body)
    payment.save((err,data) => {
      if (err) {
                 res.status(500)
                 res.send("Failed to add"+err);
               }

      else     {
                 res.status(200);
                 res.json(data);
               }

  });
  },

    add_payment:  async (req, res) => {
        console.log("Request:", req.body);
      
        let error;
        let status;
        let address;
        try {
          const { product,token } = req.body;
      
          const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
          });
      
          const idempotency_key = uuid();
          const charge = await stripe.charges.create(
            {
              amount: product *100,
              currency: "pkr",
              customer: customer.id,
              receipt_email: token.email,
              // description: `Purchased the ${product.name}`,
              shipping: {
                name: token.card.name,
                address: {
                  line1: token.card.address_line1,
                  line2: token.card.address_line2,
                  city: token.card.address_city,
                  country: token.card.address_country,
                  postal_code: token.card.address_zip
                }
              }
            },
            {
              idempotency_key
            }
          );
          console.log("Charge:",  charge.source.address_line1 );
          status = "success";
          address=charge.source.address_line1;
          CustomerID=token.email
          orderID=uniqid()
        } catch (error) {
          console.error("Error:", error);
          status = "failure";
        }
      
        res.json({error,status,address, CustomerID,orderID });
    
    },

  

    update_payment: (req, res, next) => {

        payment_schema.findByIdAndUpdate(req.params.id,req.body,{ new: true },(err, todo) => {
            
                if (err)   { 
                            res.status(500);
                            res.end("Failed to Update");
                           }

                if (!todo) {
                            res.status(404)
                            res.end("payment does not exist")
                           }

                else       {
                            res.status(200);
                            res.json(todo);
                           }

            })


    },

    delete_payment: (req, res, next) => {

        payment_schema.findByIdAndRemove(req.params.id,(err,doc)=>{

            if(err)    {
                        res.status(500);
                        res.end("Failed to Delete");
                       } 

            if (!doc)  {
                        res.status(404);
                        res.end("payment does not exist");
                       } 

            else       {
                        res.status(200);
                        res.end("Successfully deleted");
                       }

        })

    },

    view_payment: (req, res) => {

        payment_schema.findOne({ 'name': req.params.name }, function (err, doc) {
            
            if (err)  {
                       res.status("500");
                       res.end("failed to view");
                      }

            if (!doc) { 
                       res.status(404); 
                       res.send("No payment exist"); 
                      }

            else      {
                       res.status(200); 
                       res.json(doc);
                      }
        });


    },

    

    view_all_payment: (req, res, next) => {

        let sort_by = req.query.sort_by;
        if( sort_by== undefined) sort_by ='full_name';

        payment_schema.find({}, (err, doc) => {

            if (err)   {
                        res.status(500);
                        res.end("Failed to get payments");
                       } 
           
            if (!doc)  {
                        res.status(404);
                        res.end("No payment exist");
                       }
           
            else       {
                        res.status(200);
                        res.json(doc);
                       }

        }).sort(sort_by)
    
    },

 
    

}

module.exports = payment_controller
