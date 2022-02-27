import 'package:flutter/material.dart';
import 'package:monimoni/Widgets/Page3.dart';
import 'package:monimoni/Widgets/page1.dart';

import 'Widgets/Page2.dart';


class donate_page extends StatefulWidget {
  const donate_page({Key? key}) : super(key: key);

  @override
  _donate_pageState createState() => _donate_pageState();
}

class _donate_pageState extends State<donate_page> {
  PageController _controller = PageController(
    initialPage: 0,
  );
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    MediaQueryData queryData;
    queryData = MediaQuery.of(context);
    return Scaffold(
      body:
      Container(
        height: queryData.size.height,
        width: queryData.size.width,
        child: Column(
          children: [
              Container(
                height: queryData.size.height,
                child: PageView(
                  controller: _controller,
                  children: [
                              page_1(),
                              page_2(),
                    page_3()


                  ],
                ),
              )
          ],
        ),
      ),
    );
  }
}
