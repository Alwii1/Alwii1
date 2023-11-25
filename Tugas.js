import java.util.Random;
public class simulasi_monte_carlo3 {
    public static void main(String[] args) {
        // Data historis [permintaan, frekuensi]
        int[][] dataHistoris = {
                {4, 5},
                {5, 10},
                {6, 15},
                {7, 30},
                {8, 25},
                {9, 15}
        };
        // Total frekuensi
        int totalFrekuensi = hitungTotalFrekuensi(dataHistoris);

        // Menampilkan data historis
        System.out.println("Data Historis Permintaan:");
        for (int[] data : dataHistoris) {
            System.out.println("Permintaan " + data[0] + " unit = " + data[1] + " kali");
        }

        // Hitung distribusi densitas
        System.out.println("\nDistribusi Densitas:");
        double[][] distribusiDensitas = hitungDistribusiDensitas(dataHistoris, totalFrekuensi);
        for (double[] densitas : distribusiDensitas) {
            System.out.println("Permintaan " + (int) densitas[0] + " unit = " + densitas[1]);
        }

        // Hitung kumulatif distribusi densitas
        System.out.println("\nKumulatif Distribusi Densitas:");
        double[][] kumulatifDistribusi = hitungKumulatifDistribusi(distribusiDensitas);
        for (double[] kumulatif : kumulatifDistribusi) {
            System.out.println("Permintaan " + (int) kumulatif[0] + " unit = " + kumulatif[1]);
        }

        // Generate nilai random dan seleksi nilai berdasarkan kelas permintaan
        Random random = new Random();
        double nilaiRandom = random.nextDouble();

        int permintaanYangDipilih = seleksiPermintaanBerbasisRandom(kumulatifDistribusi, nilaiRandom);

        System.out.println("\nNilai Random: " + nilaiRandom);
        System.out.println("Permintaan yang Dipilih: " + permintaanYangDipilih + " unit");
    }

    public static int hitungTotalFrekuensi(int[][] dataHistoris) {
        int total = 0;
        for (int[] data : dataHistoris) {
            total += data[1];
        }
        return total;
    }

    public static double[][] hitungDistribusiDensitas(int[][] dataHistoris, int totalFrekuensi) {
        double[][] distribusiDensitas = new double[dataHistoris.length][2];
        for (int i = 0; i < dataHistoris.length; i++) {
            distribusiDensitas[i][0] = dataHistoris[i][0];
            distribusiDensitas[i][1] = (double) dataHistoris[i][1] / totalFrekuensi;
        }
        return distribusiDensitas;
    }

    public static double[][] hitungKumulatifDistribusi(double[][] distribusiDensitas) {
        double[][] kumulatifDistribusi = new double[distribusiDensitas.length][2];
        double kumulatif = 0.0;
        for (int i = 0; i < distribusiDensitas.length; i++) {
            kumulatif += distribusiDensitas[i][1];
            kumulatifDistribusi[i][0] = distribusiDensitas[i][0];
            kumulatifDistribusi[i][1] = kumulatif;
        }
        return kumulatifDistribusi;
    }

    public static int seleksiPermintaanBerbasisRandom(double[][] kumulatifDistribusi, double nilaiRandom) {
        for (double[] kumulatif : kumulatifDistribusi) {
            if (nilaiRandom <= kumulatif[1]) {
                return (int) kumulatif[0];
            }
        }
        return -1; // Nilai default jika tidak ada yang dipilih
    }
          }
