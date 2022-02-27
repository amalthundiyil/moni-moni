import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:monimoni/detail.dart';

import '../address_list.dart';
import '../final_page.dart';

class page_2 extends StatefulWidget {
  const page_2({Key? key}) : super(key: key);

  @override
  _page_2State createState() => _page_2State();
}

class _page_2State extends State<page_2> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(0,30,0,0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                IconButton(onPressed:() {
                  Navigator.push(context,
                    MaterialPageRoute(builder: (context) => camp_screen()),
                  );
                },
                    icon: Icon(Icons.arrow_back)),
                SizedBox(
                  width: 5.0,
                ),
                Text(
                  "App name",
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
            height: 20.0,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [

              Padding(
                padding: const EdgeInsets.fromLTRB(20,0,0,0),
                child: Text(
                  'Donate',

                  style: TextStyle(
                    fontSize: 50,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(
            height: 30,
          ),
          Text(
            'Description of product',
            style: TextStyle(
              fontSize: 20,
            ),
          ),
          Padding(padding: EdgeInsets.all(300)),
          GestureDetector(

            onTap: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => add_page()));

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
    );
  }
}
