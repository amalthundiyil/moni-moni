import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:monimoni/final_page.dart';
import 'package:monimoni/home_page.dart';
import 'package:percent_indicator/percent_indicator.dart';

class camp_screen extends StatefulWidget {
  const camp_screen({Key? key}) : super(key: key);

  @override
  _camp_screenState createState() => _camp_screenState();
}

class _camp_screenState extends State<camp_screen> {

  @override
  Widget build(BuildContext context) {
    MediaQueryData queryData;
    queryData = MediaQuery.of(context);
    return Scaffold(
      body: Container(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(0,30,0,0),
            child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      IconButton(onPressed:() {
                        Navigator.push(context,
                        MaterialPageRoute(builder: (context) => homepage()),
                        );
                      },
                          icon: Icon(Icons.arrow_back)),
                      SizedBox(
                        width: 5.0,
                      ),
                      Text(
                        "Money",
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

                  SizedBox(
                    height: queryData.size.height*0.9,
                    child: Stack(
                      children: [
                        Positioned(
                          height: 300,
                          child: Container(

                            decoration: BoxDecoration(
                              color: Colors.black,
                            ),
                            height: 250,
                            width: MediaQuery.of(context).size.width,
                          ),
                        ),

            Positioned(
              top: 250,
              width: MediaQuery.of(context).size.width,
              child: Container(
                    height: MediaQuery.of(context).size.height,
                    padding: EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey,
                          blurRadius: 4.0,
                        ),
                      ],
                    ),
                child: Column(
                  children: [
                    Row(
                        mainAxisAlignment:
                        MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Name of product',
                            style: TextStyle(
                                color: Colors.black,
                              fontSize: 20,
                            ),),

                          Text('Name of product',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 20,
                            ),),

                        ]


                    ),
                    Divider(
                      color: Colors.grey,
                    ),
                Padding(
                  padding: const EdgeInsets.only(
                    top: 30,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'CTV',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16
                        ),
                      ),
                      Text(
                        'CTV',
                        style: TextStyle(
                          color: Colors.blue,
                          fontSize: 16,
                        ),
                      )

                    ],
                  ),
                ),

                    Padding(
                      padding: const EdgeInsets.only(
                        top: 8.0,
                      ),
                      child: LinearPercentIndicator(
                        width: MediaQuery.of(context).size.width - 40,
                        animation: true,
                        lineHeight: 25.0,
                        animationDuration: 1000,
                        // percent: ,

                        linearStrokeCap: LinearStrokeCap.roundAll,
                        progressColor: Theme.of(context).primaryColor,
                      ),
                    ),
                    Padding(
                      padding:
                      const EdgeInsets.only(top: 12, bottom: 20),
                      child: Row(
                        mainAxisAlignment:
                        MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'hello'
                          )
                          // Text(
                          //   ((double.parse(snapshot.data['details']
                          //   ['fundingRaised']) *
                          //       100 /
                          //       double.parse(snapshot
                          //           .data['details']
                          //       ['target'])) /
                          //       1)
                          //       .toStringAsFixed(2) +
                          //       " %",
                          //   style: TextStyle(
                          //     fontSize: 16,
                          //     color: Colors.grey,
                          //   ),
                          // ),
                          // Text(
                          //   "Equity : " +
                          //       snapshot.data['details']['equity'] +
                          //       " %",
                          //   style: TextStyle(
                          //     fontSize: 16,
                          //     color: Colors.grey,
                          //   ),
                          // )
                        ],
                      ),
                    ),
                    Divider(
                      color: Colors.grey,
                    ),

                    Container(
                      height: 30,
                        margin: EdgeInsets.only(bottom: 10, top: 5),
                        width: MediaQuery.of(context).size.width - 40,
                      child: DefaultTabController(
                        length: 4,
                        child: TabBar(
                          indicatorColor: Colors.blue,
                          labelStyle: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                            color: Colors.black,
                            fontFamily: 'Avenir',
                          ),
                          tabs: [
                            Tab(
                              child: Text(
                                "Invest",
                                style: TextStyle(
                                  color: Colors.black
                                ),
                              ),
                            ),
                            Tab(
                              child: Text(
                                "Invest",
                                style: TextStyle(
                                    color: Colors.black
                                ),
                              ),
                            ),
                            Tab(
                              child: Text(
                                "Invest",
                                style: TextStyle(
                                    color: Colors.black
                                ),
                              ),
                            ),
                            Tab(
                              child: Text(
                                "Invest",
                                style: TextStyle(
                                    color: Colors.black
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    Padding(padding: EdgeInsets.fromLTRB(0,0,0,queryData.size.height*0.25)),


                    GestureDetector(

                      onTap: () {
                        Navigator.push(context,
                        MaterialPageRoute(builder: (context) => donate_page()));

                      },
                      child: Container(
                        height: 50,
                        decoration: BoxDecoration(
                          color: Colors.blue,
                          borderRadius: BorderRadius.circular(30),
                          
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [

                            Text('Invest on Product',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20
                            ),)
                          ],
                        ),
                      ),
                    )
                  ],
                ),
              )
                    ),





                ],
            ),
                  )
            ]
          ),
        ),
      ),
      )
    );
  }
}
