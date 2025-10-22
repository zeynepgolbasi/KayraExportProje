# KayraExportProje
Bu proje, **Backend** .NET API ve **Frontend** (Next.js) olarak iki ayrı klasörde geliştirilmiştir.
## İçerik
- `backend/` → API ve veri tabanı işlemleri
- `frontend/` → Kullanıcı arayüzü
## Gereksinimler
- Node.js >= 18 (Frontend için)
- .NET SDK >= 8.0 (Backend için)
- SQL Server (veya projede kullanılan veri tabanı)
## Backend Kurulum
1. Backend klasörüne girin:
bash cd backend komutunu çalıştırın.
2. Bağımlılıkları yükleyin:
dotnet restore
3. Veritabanı bağlantı ayarlarını appsettings.json dosyasında düzenleyin.
4. Projeyi çalıştırın:
dotnet run
Uygulama http://localhost:5193/swagger/index.html adresinde çalışır.
## Frontend Kurulum
1. Frontend klasörüne girin:
bash cd frontend komutunu çalıştırın.
2.Bağımlılıkları yükleyin:
npm install
3. Projeyi başlatın:
npm run dev
Uygulama http://localhost:3000 adresinde çalışır.

