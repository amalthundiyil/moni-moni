import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:monimoni/checkout.dart';
import 'package:monimoni/new.dart';

import 'address_list.dart';

class add_address extends StatefulWidget {
  const add_address({Key? key}) : super(key: key);

  @override
  _add_addressState createState() => _add_addressState();
}

class _add_addressState extends State<add_address> {
  @override
  Widget build(BuildContext context) {
    MediaQueryData queryData;
    queryData = MediaQuery.of(context);
    return Scaffold(
        backgroundColor: Colors.grey[100],
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        iconTheme: IconThemeData(color: Colors.black),
        title: Text(
          'Add Address',
          style: const TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.bold,
              fontFamily: "Montserrat",
              fontSize: 18.0),
        ),
      ),
      body: AddAddressForm()
    );
  }
}
