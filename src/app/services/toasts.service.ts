import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  showNotification(message: string, type: 'success' | 'error') {
    const toastElement = document.createElement('div');
    toastElement.className = `toast ${type === 'error' ? 'bg-danger' : 'bg-success'} text-light`; // Set different classes for error and success
    toastElement.innerHTML = `
    <div class="toast-body">
      ${message}
    </div>
  `;

    document.body.appendChild(toastElement);

    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 1000);
  }
}
