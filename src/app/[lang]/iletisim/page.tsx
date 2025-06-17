const ContactPage = () => {
  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary">İletişim Kurun</h1>
        <p className="text-lg text-center text-text-primary/80 mt-4 mb-12 max-w-2xl mx-auto">
          Özel siparişler, mevcut enstrümanlar hakkında bilgi almak veya sadece bir merhaba demek için aşağıdaki formu kullanabilirsiniz.
        </p>
        <div className="max-w-2xl mx-auto bg-surface p-8 rounded-lg shadow-lg">
          <form>
            <div className="mb-6">
              <label className="block text-text-primary text-sm font-bold mb-2" htmlFor="name">
                Adınız Soyadınız
              </label>
              <input className="shadow-inner appearance-none border border-accent/20 rounded w-full py-3 px-4 bg-background text-text-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent" id="name" type="text" placeholder="Adınız Soyadınız" />
            </div>
            <div className="mb-6">
              <label className="block text-text-primary text-sm font-bold mb-2" htmlFor="email">
                E-posta Adresiniz
              </label>
              <input className="shadow-inner appearance-none border border-accent/20 rounded w-full py-3 px-4 bg-background text-text-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent" id="email" type="email" placeholder="email@example.com" />
            </div>
            <div className="mb-8">
              <label className="block text-text-primary text-sm font-bold mb-2" htmlFor="message">
                Mesajınız
              </label>
              <textarea className="shadow-inner appearance-none border border-accent/20 rounded w-full py-3 px-4 bg-background text-text-primary leading-tight focus:outline-none focus:ring-2 focus:ring-accent h-40" id="message" placeholder="Mesajınızı buraya yazın..."></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button className="px-10 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/80 transition-colors duration-300 shadow-lg" type="button">
                Mesajı Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 