import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Menu } from 'src/app/_model/menu';
import { LoginService } from 'src/app/_service/login.service';
import { MenuService } from 'src/app/_service/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  usuario : string;
  varimg : string;

  menus : Menu[];

  constructor(
    private router : Router,
    //reac
    private menuService : MenuService,

    //funcion cerrar sesion
    private loginService : LoginService

  ) { }

  ngOnInit(): void {


    //url de imagen;
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem(environment.TOKEN_NAME);

    if (token) {
      const decodedToken = helper.decodeToken(token);
      //this.usuario = decodedToken.user_name;
      this.usuario = decodedToken.user_name; // Captura el atributo 'foto'
    }

    if (this.usuario == 'Allow'){
      this.varimg = "https://i.pinimg.com/236x/ee/62/75/ee62751e6dc8eb8c6116add9292cbe9d.jpg";
    }else if (this.usuario == 'Roberto'){
      this.varimg = "https://i.pinimg.com/474x/15/25/bf/1525bf9fe03ea06303dffd292b2dd36d.jpg";
    }else if (this.usuario == 'Tarro'){
      this.varimg = "https://i.pinimg.com/236x/05/77/6e/05776e2211915dbc81e917751aa068a7.jpg";
    }else {
      this.varimg = "https://i.pinimg.com/736x/69/5a/a6/695aa6bc5c9ef70e86a0eeb7510b0a5a.jpg";
    }
    console.log(this.varimg);


    this.menuService.listarPorUsuario(sessionStorage.getItem('username'))
    .subscribe(data => this.menus = data);


    this.menuService.getMenuCambio().subscribe(data => {
        this.menus = data;
    });

    

  }


  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}
