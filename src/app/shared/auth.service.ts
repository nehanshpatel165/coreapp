import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {
   }
 
  signup(signupInfo: any): Observable<any> {
     return this.http.post("http://127.0.0.1:8000/register-user", signupInfo);
  }
 
  login(loginInfo: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/login-user", loginInfo).pipe(
      tap((response: any) => {
        localStorage.setItem('accToken', response.Token.access);
        localStorage.setItem('refToken', response.Token.refresh);
        this.scheduleTokenRefresh();
      })
    );
  }
  scheduleTokenRefresh() {
    setInterval(() => {
       const currentRefreshToken = localStorage.getItem('refToken');
       const refreshInfo = { refresh: currentRefreshToken || '' };
   
       this.refreshToken(refreshInfo).subscribe(
         () => console.log('Token refreshed successfully'),
         error => {
           console.error('Error refreshing token', error);
           // Handle token refresh failure, e.g., redirect to login
         }
       );
    }, 120000); // 1.5 minutes 1,20,000
   }

   refreshToken(refreshInfo: any): Observable<any> {
    if (!refreshInfo.refresh) {
       console.error('No refresh token available');
       return throwError('No refresh token available');
    }
   
    return this.http.post("http://127.0.0.1:8000/token/refresh", refreshInfo).pipe(
       tap((response: any) => {
         console.log('Refresh token response:', response);
         if (response) {
          // localStorage.removeItem('accToken')
          // localStorage.removeItem('refToken')
           localStorage.setItem('accToken', response.access);
           localStorage.setItem('refToken', response.refresh);
         } else {
           console.error('Unexpected response structure:', response);
           // Handle unexpected response structure
         }
       })
    );
   }

//   refreshInfo={
//     refresh:'',
//   }
//   // Inside AuthService
//   refreshToken(): Observable<any> {
   
//     const refreshToken = localStorage.getItem('refToken');
//     this.refreshInfo.refresh=refreshToken || ''
//     if (!refreshToken) {
//       console.error('No refresh token available');
//       return throwError('No refresh token available');
//     }

//     return this.http.post("http://127.0.0.1:8000/token/refresh",this.refreshInfo).pipe(
//       tap((response: any) => {
//         console.log('Refresh token response:', response); // Log the response to inspect its structure
//         if (response && response.Token) {
//           localStorage.setItem('accToken', response.Token.access);
//           localStorage.setItem('refToken', response.Token.refresh);
//         } else {
//           console.error('Unexpected response structure:', response);
//           // Handle unexpected response structure
//         }
//       })
//    );
//  }

//  scheduleTokenRefresh() {
//     setInterval(() => {
//       this.refreshToken().subscribe(
//         () => console.log('Token refreshed successfully'),
//         error => {
//           console.error('Error refreshing token', error);
//           // Handle token refresh failure, e.g., redirect to login
//         }
//       );
//     }, 90000); // 1.5 minutes
//  }
 

}
