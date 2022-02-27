import 'package:flutter/material.dart';

import 'button.dart';


class main_page extends StatelessWidget {
  const main_page({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // final ImageProvider _imageProvider;
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Stack(
            children: [
              Center(
                child: Stack(
                  alignment: Alignment.bottomCenter,
                  children: [
                    //Gradiente

                    Container(
                      // margin: const EdgeInsets.all(10),
                      // padding: const EdgeInsets.all(10),
                      width: MediaQuery.of(context).size.width,
                      // height: 1024,
                      height: MediaQuery.of(context).size.height,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            Colors.red.shade400,
                            Colors.pink,
                            Colors.pinkAccent.shade400,
                          ],
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(bottom: 320),
                    ),

                    Padding(
                      padding: const EdgeInsets.fromLTRB(25,10,25,30),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text(
                            'By clicking Log in, you agree with our Terms. Learn how we process your data in our Privacy Policy and Cookies Policy.',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.w400,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          const SizedBox(
                            height: 30,
                          ),


                          const TinderButton(
                            texto: 'LOG IN WITH EMAIL',
                            imagem: AssetImage('assets/images/google.png'),
                            cor: Colors.black87,
                          ),

                          const SizedBox(
                            height: 20,
                          ),

                          const TinderButton(
                            texto: 'LOG IN WITH YOUR PHONE',
                            imagem: AssetImage('assets/images/chats.png'),
                            cor: Colors.black87,
                          ),
                          // Espaçador
                          const SizedBox(
                            height: 30,
                          ),
                          const Text(
                            'Trouble logging in?',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          const SizedBox(
                            height: 40,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
