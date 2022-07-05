<template>
  <div>
    <b-jumbotron bg-variant="success" text-variant="white" header="Reparasi laptop, handphone, kamera, printer, cctv, dll" lead="Siap melayani perbaikan kerusakan pada gadget kamu" header-level="4" fluid/>
    <p class="mt-3 h4 text-center text-capitalize">Alasan memilih service center <span class="font-weight-bold text-success">MASKOM</span></p>
    <CardGroup class="mt-2">
      <Card icon="fa fa-eye" title="Pemantauan Mudah" content="Maskom menyediakan Kemudahan dalam memantau progres pengerjaan perbaikan kapanpun dan dimanapun."/>
      <Card icon="fa fa-money-bill-wave-alt" title="Gratis Konsultasi" content="Maskom memberikan GRATIS konsultasi. Semua harga akan di infokan pada pelayanan."/>
    </CardGroup>
    <CardGroup>
      <Card icon="fa fa-shield-alt" title="Garansi 30 Hari" content="Kualitas yang Menjanjikan dengan memberikan garansi 30 hari sejak perbaikan selesai."/>
      <Card icon="fa fa-tools" title="Teknisi Handal" content="Teknisi handal kami bisa memperbaiki berbagai macam kerusakan gadget kamu."/>
    </CardGroup>
    <p class="mt-3 h4 text-center text-capitalize">Letak service center <span class="font-weight-bold text-success">MASKOM</span></p>
    <Location/>
    <p class="mt-3 h4 text-center text-capitalize">Cara kerja <span class="font-weight-bold text-success">MASKOM</span> service center</p>
    <CardGroup class="mt-2">
      <Card icon="fab fa-teamspeak" title="Langkah 1" content="Jelaskan masalah gadget kamu kepada Kami."/>
      <Card icon="fas fa-diagnoses" title="Langkah 2" content="Kami akan mendiagnosa dan menentukan kisaran biaya perbaikan gadget kamu."/>
    </CardGroup>
    <CardGroup>
      <Card icon="fas fa-handshake" title="Langkah 3" content="Setelah setuju harga, proses perbaikan dimulai."/>
      <Card icon="fa fa-thumbs-up" title="Langkah 4" content="Proses perbaikan selesai, gadget Anda dapat digunakan kembali."/>
    </CardGroup>
  </div>
</template>

<script>
export default {
  layout:'user'
}
</script>