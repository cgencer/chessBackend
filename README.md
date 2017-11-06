# chessBackend

Credit Fields
---------------------------
credit1 ...	personal score
credit2 ... team score
credit3 ... level of knowledge (e.g. educational)
credit4 ...	ELO ratings
credit5 ...	coins (to be exchanged into real items)

Virtual Goods
---------------------------
* NewPlayerGift
* GuestPlayerGift



Potentials
---------------------------
1. Creating challenges, game-match, etc gives coin
2. GuestPlayers could get x number of free games
3. 'hidden coins' with .creditN() can track some other stuff
4. every user is also the 1st member of his team (of friends), thus his friends can be added to his team to raise group scores
5. levels (not ELO) could be created with some tests levelUps


Oyuncu ölçümlemesi, ELO / level:
- Her oyuncunun seviyesi ayrıca tutulacak. 
- Belli seviye basamaklarında (mesela her 5. seviyede) oyuncuya testler yaptırılabilir. Bu testler, özellikle abonelikli 'öğrencilere' özel geliştirilmiş egzersiz niteliğinde olabilir. Pakete dahil olmayan oyuncular, testleri görmez. Testlerin yapılmasıyla beraber ELO seviyesini tekrar hesaplarız.
- Eğitim paketi v.b. almayan oyuncuların ELO'su entropiye tabidir (zamanla azalır). Bu sayede ek paketsiz oyuncu, kendisini zorlayıcı / geliştirebilecek oyuncularla daha seyrek karşılaşır, nispeten seviyesinde oyunlar oynar.
- Her oyuncunun (ELO-baseELO)/100 level'ını belirleyebilir.

Ekip / Grup:
Oyun içinde her oyuncunun arkadaş listesi ayrı tutulur. Bu sayede mesela Ali'nin arkadaşları, belli bir zamanda Ali'nin iyileşmesi için ek destek sağlayabilirler. Ya da dönemsel ekip kapışmaları ölçümlenebilir ve daha başarılı ekibe ödül / puan verilebilir. Bu sanal rozet olabilir, bir puanın ekibe paylaştırılması olabilir.

Puan / Rozet / Para:
Kişisel puan, ekip puanı, puana bağlı alınabilecek sanal rozetler, puanlarla biriktirilebilecek sanal para ve sanal para yardımıyla bazı gerçek ürünlerin alınması (satranç tahtası, bere, tişört, kitap, vb)
