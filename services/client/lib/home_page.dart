import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:monimoni/detail.dart';

import 'auth.dart';

class homepage extends StatefulWidget {
  const homepage({Key? key}) : super(key: key);

  @override
  _homepageState createState() => _homepageState();
}

class _homepageState extends State<homepage> {
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
                height:
                30.0,
              ),
              Row(
                children: [
                  Row(

                    children: [
                      IconButton(onPressed:() {},
                          icon: Icon(Icons.dehaze)),
                      SizedBox(
                        width: 10.0,
                      ),
                      Text(
                        "Money",
                        style: GoogleFonts.poppins(
                          fontWeight: FontWeight.bold,
                          fontSize: 19.0,
                        ),
                      ),
                      SizedBox(
                        width: 50.0,
                      ),

                    ],
                  ),
                ],
              ),
              SizedBox(
                height: 10.0 ,
              ),
                Row(
                  children: [
                    Padding(padding: EdgeInsets.fromLTRB(30, 0, 0, 0)),
                    Container(
                      height: queryData.size.height*0.07,
                      width: queryData.size.width*0.7,
                      child: Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30)
                        ),
                        elevation: 3,
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [

                            SizedBox(
                              width: 10,
                            ),

                            Text(
                              'Enter Text here',
                              style: TextStyle(
                                color: Colors.black,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    SizedBox(
                      width: 10,
                    ),

                    Stack(
                      children: [
                        Container(
                        height: 50,
                        width: 50,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.cyan
                        ),
                      ),
                        IconButton(onPressed: () {},
                            icon: Icon(
                              Icons.search,
                              color: Colors.white,
                            ),
                        )
                    ]
                    ),
                  ],
                ),
              Container(
                height: queryData.size.height,
                child: SingleChildScrollView(
                  child: GestureDetector(
                    onTap: () {
                      Navigator.push(context,
                      MaterialPageRoute(builder: (context) => camp_screen()),
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

