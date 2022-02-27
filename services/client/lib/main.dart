import 'package:flutter/material.dart';
import 'package:monimoni/auth.dart';
import 'mainpage.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';



void main() async {
  await dotenv.load(fileName: ".env");
  runApp(const MoniMoni());
}

class MoniMoni extends StatelessWidget {
  const MoniMoni({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Moni Moni',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: main_page(),
    );
  }
}



