import 'package:flutter/material.dart';
import 'package:monimoni/auth.dart';

class TinderButton extends StatelessWidget {
  final String texto;
  final ImageProvider? imagem;
  final Color? cor;
  final ElevatedButton? icon;

  const TinderButton({
    Key? key,
    required this.texto,
    this.imagem,
    this.cor,
    this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        Navigator.push(context,
            MaterialPageRoute(builder: (context) => LoginPage()),
        );
      },
      style: ButtonStyle(
        elevation: MaterialStateProperty.all(2),
        overlayColor: MaterialStateProperty.all(Colors.black12),
        shadowColor: MaterialStateProperty.all(Colors.pink.shade50),
        shape: MaterialStateProperty.all(
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(50))),
        backgroundColor: MaterialStateProperty.all(Colors.white),
        fixedSize: MaterialStateProperty.all(const Size(412, 60)),
      ),
      child: Row(
        children: [
          // ImageIcon(
          //   imagem,
          //   size: 30,
          //   color: cor,
          // ),
          const Spacer(),
          Text(
            texto,
            textAlign: TextAlign.center,
            style: const TextStyle(
                color: Colors.black87,
                fontSize: 17,
                fontWeight: FontWeight.w500),
          ),
          const Spacer(),
        ],
      ),
    );
  }
}