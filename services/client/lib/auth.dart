import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:monimoni/home_page.dart';
import 'package:lottie/lottie.dart';

class LoginPage extends StatefulWidget {
  const LoginPage(
      {
        Key? key,
      }
      ) : super(key: key);


  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool _isObscure = true;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          height: size.height,
          child: Center(
            child: Padding(
              padding: EdgeInsets.fromLTRB(10, 70, 10, 10),
              child: Column(
                children: [
                  Align(
                    alignment: Alignment.topLeft,
                    child: Text(
                      "Login To your ",
                      style: TextStyle(
                        fontSize: 34,
                        fontWeight: FontWeight.bold

                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment.topLeft,
                    child: Text(
                      "account ",
                      style: TextStyle(
                        fontSize: 34,
                        fontWeight: FontWeight.bold

                      ),
                    ),
                  ),
                  SizedBox(height: 80,),

                  Container(

                    padding: EdgeInsets.all(10.0),
                    child: Column(
                      children: <Widget>[
                        Row(
                          children: <Widget>[
                            Expanded(
                              child: TextField(
                                decoration: InputDecoration(

                                    hintText: 'Username or Email',
                                    hintStyle: Theme.of(context).textTheme.caption?.copyWith(
                                      fontSize: 14,
                                    )
                                ),

                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),

                  Container(
                    padding: EdgeInsets.all(10.0),
                    child: Column(
                      children: <Widget>[
                        Row(
                          children: <Widget>[
                            Expanded(
                              child: TextField(
                                obscureText: _isObscure,
                                decoration: InputDecoration(
                                    suffixIcon: IconButton(
                                        icon: Icon(
                                            _isObscure ? Icons.visibility : Icons.visibility_off),
                                        onPressed: () {
                                          setState(() {
                                            _isObscure = !_isObscure;
                                          });
                                        }),

                                    hintText: 'Password',
                                    hintStyle: Theme.of(context).textTheme.caption?.copyWith(
                                      fontSize: 14,
                                    )
                                ),

                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  // Row(
                  //   mainAxisAlignment: MainAxisAlignment.end,
                  //   children: [
                  //     Text("Forgot Password?",style: GoogleFonts.roboto(
                  //       decoration: TextDecoration.underline,color: Color(0xffFF6E30),
                  //       fontSize: 14,
                  //       fontWeight: FontWeight.bold,
                  //     ),),
                  //   ],
                  // ),
                  SizedBox(
                    height: 10,
                  ),
                  Padding(
                      padding: const EdgeInsets.only(bottom: 350)),
                  GestureDetector(
                    onTap: (){
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => homepage()),
                      );
                    },
                    child: Container(
                      height: 60,
                      child: Card(
                        color: Color(0xffFF6E30),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(50.0),
                        ),
                        child: Container(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Text("LOGIN",style: GoogleFonts.poppins(
                                    fontSize: 14,
                                    color: Colors.white,
                                  ),)
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),

                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}


class _ChechBox extends StatefulWidget {
  const _ChechBox({Key? key}) : super(key: key);

  @override
  _ChechBoxState createState() => _ChechBoxState();
}

class _ChechBoxState extends State<_ChechBox> {
  bool rememberMe = false;
  void _onRememberMeChanged(bool? newValue) => setState(() {
    rememberMe = newValue!;

    if (rememberMe) {
      // TODO: Here goes your functionality that remembers the user.
    } else {
      // TODO: Forget the user
    }
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Checkbox(
            value: rememberMe,
            onChanged: _onRememberMeChanged
        ),
        Text("Remember Me?",style: GoogleFonts.roboto(
          color: Color(0xff748FB5),
          fontSize: 14,
        ),),
      ],
    );
  }
}

