// export const convertToBase64 = (file: File) => {
//     return new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result as string);
//         reader.onerror = error => reject(error);
//     }).then(base64String => base64String).catch(error => {
//     console.error('Error converting file to Base64:', error);
// });
// }

export const convertToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };
  
  