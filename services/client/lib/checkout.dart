import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:monimoni/my_flutter_app_icons.dart';

import 'home_page.dart';

class payment_page extends StatefulWidget {
  const payment_page({Key? key}) : super(key: key);

  @override
  _payment_pageState createState() => _payment_pageState();
}

class _payment_pageState extends State<payment_page> {

  @override
  Widget build(BuildContext context) {
    MediaQueryData queryData;
    queryData = MediaQuery.of(context);
    return Scaffold(
      body:Column(

        children: [
          SizedBox(
            height: 35,
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(0,0,0,20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [

                IconButton(onPressed:() {
                  Navigator.push(context,
                    MaterialPageRoute(builder: (context) => homepage()),
                  );
                },
                    icon: Icon(Icons.arrow_back)),

                Text(
                  "Payments",
                  style: GoogleFonts.poppins(
                    fontWeight: FontWeight.bold,
                    fontSize: 30.0,
                  ),
                ),

                IconButton(onPressed:() {},
                    icon: Icon(Icons.dehaze))
              ],
            ),
          ),
          Padding(padding: EdgeInsets.fromLTRB(0, 0, 0, queryData.size.height*0.08)),
          Column(
            children: [
              Container(
                margin: const EdgeInsets.all(16.0),
                padding: const EdgeInsets.fromLTRB(
                    16.0, 0, 16.0, 16.0),
                decoration: BoxDecoration(
                    color: Colors.white,
                    boxShadow: [BoxShadow(
                        color: Colors.grey,
                        blurRadius: 20
                    )],
                    borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(10),
                        bottomRight: Radius.circular(10))),
                child: Row(
                  children: [

                      Padding(
                        padding: const EdgeInsets.fromLTRB(0,10,40,0),
                        child: Image.asset('images/ellipse.png',
                        height: 100,
                        width: 100,),
                      ),
                    SizedBox(
                      width: 10,
                    ),
                    Column(
                      children: [
                        Text(
                          'Product name',
                          style: TextStyle(
                            fontSize: 17
                          ),
                        ),
                        Container(
                          height: 30,
                          width: 150,
                          child: ListTile(
                            title: Text('Price: ',
                            style: TextStyle(
                              fontSize: 17,
                            )),
                            trailing: Text('74.68',
                            style: TextStyle(
                              fontSize: 17,
                            ),),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                margin: const EdgeInsets.all(16.0),
                padding: const EdgeInsets.fromLTRB(
                    16.0, 0, 16.0, 16.0),
                decoration: BoxDecoration(
                    color: Colors.white,
                    boxShadow: [BoxShadow(
                      color: Colors.grey,
                          blurRadius: 20
                    )],
                    borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(10),
                        bottomRight: Radius.circular(10))),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    ListTile(
                      title: Text('Product name: '),
                      trailing: Text('74.68'),
                    ),
                    ListTile(
                      title: Text('Tax'),
                      trailing: Text('1.25'),
                    ),

                    Divider(),
                    ListTile(
                      title: Text(
                        'Total',
                        style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold),
                      ),
                      trailing: Text(
                        '\$ 75.93',
                        style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold),
                      ),
                    )
                  ],
                ),
              ),
            ],
          ),
          SizedBox(
            height: 50,
          ),
          GestureDetector(
            child:  Stack(
                children: [
                  Container(
                    height: 50,
                    width: queryData.size.width*0.8,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        color: Color(0xffe5e5e5)
                    ),
                  ),
                  Positioned(
                    top: 10,
                    left: 280,
                    child:  Icon(
                        MyFlutterApp.paypal_1,
                        color: Colors.blue,
                      ),
                    ),

                ]
            ),
            // child: Stack(
            //   children: [Container(
            //     height: 45,
            //     width: queryData.size.width*0.8,
            //     decoration: BoxDecoration(
            //       borderRadius: BorderRadius.circular(20),
            //       color: Color(0xFFd3d3d3)
            //     ),
            //
            //   ),
            //     IconButton(onPressed: () {},
            //         icon: Icon(Icons.paypal))
            // ]
            // ),
          )
        ],
      ),
    );
  }
}



