import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:monimoni/addresspage.dart';
import 'package:monimoni/checkout.dart';
import 'package:monimoni/home_page.dart';

import 'detail.dart';
import 'final_page.dart';

class add_page extends StatefulWidget {
  const add_page({Key? key}) : super(key: key);

  @override
  _add_pageState createState() => _add_pageState();
}

class _add_pageState extends State<add_page> {
  @override
  Widget build(BuildContext context) {
    MediaQueryData queryData;
    queryData = MediaQuery.of(context);
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          child: Column(
            children: [
              SizedBox(
                height: 30,
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(0,30,0,0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    IconButton(onPressed:() {
                      Navigator.push(context,
                        MaterialPageRoute(builder: (context) => donate_page()),
                      );
                    },
                        icon: Icon(Icons.arrow_back)),
                    SizedBox(
                      width: 5.0,
                    ),
                    Text(
                      "Address Page",
                      style: GoogleFonts.poppins(
                        fontWeight: FontWeight.bold,
                        fontSize: 19.0,
                      ),
                    ),
                    SizedBox(
                      width: 5.0,
                    ),
                    IconButton(onPressed:() {},
                        icon: Icon(Icons.dehaze))
                  ],
                ),
              ),
              SizedBox(
                height: 10,
              ),
              Text(
                'Select Address',
                style: TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.bold
                ),
              ),
              SizedBox(
                height: 30,
              ),
            GestureDetector(

              onTap: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => add_address()));

              },
              child: Container(
                height: 50,
                width: 300,
                decoration: BoxDecoration(
                  color: Colors.blue,
                  borderRadius: BorderRadius.circular(30),

                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [

                    Text('Add a new Address',
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 20
                      ),)
                  ],
                ),
              ),
            ),
              Container(
                height: queryData.size.height,
                child: SingleChildScrollView(
                  child: GestureDetector(
                    onTap: () {
                      Navigator.push(context,
                        MaterialPageRoute(builder: (context) => payment_page()),
                      );
                    },
                    child: Container(
                      height: queryData.size.height,
                      child: ListView.builder(
                          itemCount: 10,
                          itemBuilder: (BuildContext context,int index){
                            return  Padding(
                              padding: const EdgeInsets.fromLTRB(10,10, 10, 10),
                              child: Container(
                                height: queryData.size.height*0.23,
                                // decoration: BoxDecoration(
                                //   boxShadow: [BoxShadow(
                                //     color: Colors.grey,
                                //     blurRadius: 20
                                //   )]
                                // ),
                                child: Card(
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(16.0)
                                  ),
                                  elevation: 5,
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [



                                    ],
                                  ),
                                ),
                              ),
                            );
                          }
                      ),


                    ),
                  ),
                ),
              )

            ],
          ),
        ),
      ),
    );
  }
}
