
    useFecth.js
- pentru preluarea datelor cu GraphQL am folosit Apollo Client
- mi-am creat un custom Hook useFetch in care apelez useQuery cu query-ul GET_POSTS
- apoi, in Hook-ul useEffect, setez obiectul posts; preiau luna adaugarii fiecarei postari
  si o mapez intr-un obiect in care tin numarul de postari pentru fiecare luna: postsPerMonth
- in final, returnez un obiect posts care contine obiectul postsPerMonth, boolean-ul loading si
  eroarea error, intoarse de useQuery

    App.js
- pentru realizarea graficului am folosit pachetul visx
- am definit axa X ca fiind lunile anului
- am definit axa Y ca fiind nr. de postari per fiecare luna
- in componenta BarGraph am inceput constructia graficului folosind visx
- am parcurs un array cu toate lunile anului si pentru fiecare bar chart am setat
  latimea si inaltiema in functie de numarul de postari din luna respectiva.
- deasupra fiecarui bar chart am adaugat si un text cu numarul de postari din luna respectiva.