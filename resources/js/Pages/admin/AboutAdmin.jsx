import React, { useState, useEffect } from "react";
import { useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from "../../Layouts/AdminLayout";

const AboutAdmin = () => {
const [showModal, setShowModal] = useState(false);
const { props } = usePage();
const aboutData = props.aboutData || []; // fallback jika kosong
const [previewStruktur, setPreviewStruktur] = useState(null);


const { data, setData, post, processing, reset } = useForm({
    nama_sekolah: "",
    judul: "",
    sub_judul: "",
    about: "",
    deskripsi: "",
    alamat: "",
    no_hp: "",
    website: "",
    email: "",
    instagram: "",
    jam_operasional_1: "",
    jam_operasional_2: "",
    maps: "",
    copyright: "",
    logo: null,
    gambar: null,
    gambar_struktur: null,
    barcode: null,
});
useEffect(() => {
  if (data.gambar_struktur && typeof data.gambar_struktur !== "string") {
    // preview file baru
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setPreviewStruktur(e.target.result);
    };
    fileReader.readAsDataURL(data.gambar_struktur);
  } else {
    // tampilkan gambar lama dari server
    setPreviewStruktur(`/storage/${aboutData.gambar_struktur}`);
  }
}, [data.gambar_struktur, aboutData.gambar_struktur]);

const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);

const handleEdit = (item) => {
    setData({
        nama_sekolah: item.nama_sekolah || "",
        judul: item.judul || "",
        sub_judul: item.sub_judul || "",
        about: item.about || "",
        deskripsi: item.deskripsi || "",
        alamat: item.alamat || "",
        no_hp: item.no_hp || "",
        website: item.website || "",
        email: item.email || "",
        instagram: item.instagram || "",
        jam_operasional_1: item.jam_operasional_1 || "",
        jam_operasional_2: item.jam_operasional_2 || "",
        maps: item.maps || "",
        copyright: item.copyright || "",
        logo: null,
        gambar: null,
        gambar_struktur: null,
        barcode: null,
    });
    setEditId(item.id);
    setIsEditing(true);
    setShowModal(true);
};

const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    router.delete(`/admin/about/${id}`, {
    onSuccess: () => {
    alert("✅ Data berhasil dihapus");
    },
    onError: () => {
    alert("❌ Gagal menghapus data");
    },
    });
    }
};

// Fungsi ketika tombol Simpan ditekan
const handleSubmit = (e) => {
e.preventDefault();

const options = {
    forceFormData: true,
    onSuccess: () => {
    reset();
    setShowModal(false);
    setEditId(null);
    setIsEditing(false);
    alert("✅ Data berhasil disimpan");
    },
    onError: () => alert("❌ Gagal menyimpan data."),
};

if (isEditing) {
router.post(`/admin/about/${editId}`, data, options); // untuk update
} else {
post("/admin/about", options); // untuk create
}
};

return (
<div className="p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🏫 Tentang Sekolah
    </h1>

    {/* Button Tambah */}
    <div className="mb-6 w-6/6 flex flex-wrap gap-3 md:flex-row justify-between">
        <button onClick={()=> {
            reset(); // kosongkan form
            setEditId(null);
            setIsEditing(false);
            setShowModal(true);
            }}
            className={`px-5 py-2 rounded-md transition ${
            aboutData.length >= 1
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "hidden"

            }`}
            disabled={aboutData.length >= 1}
            >
            Tambah Sekolah
        </button>
        <div className="flex flex-row gap-2">
            <button onClick={()=> handleEdit(aboutData)}
                className="px-5 py-2 rounded-md transition bg-yellow-500 text-white hover:bg-yellow-600 "
                >
                Edit
            </button>
            <button onClick={()=> handleDelete(aboutData.id)}
                className="px-5 py-2 rounded-md transition bg-red-600 text-white hover:bg-red-700 "
                >
                Hapus
            </button>
        </div>

    </div>

    {/* Tabel Konten */}
    <div className="w-full overflow-x-auto">
        <table className="min-w-6/6 w-fit text-sm border border-gray-200 shadow-sm">
            <tbody className="bg-gray-100 text-left text-gray-700">
                {aboutData && Object.keys(aboutData).length > 0 ? (
                <>
                    <tr>
                        <th className="px-4 py-2 border">Nama Sekolah</th>
                        <td className="border px-2 py-1 max-w-[200px] truncate">{aboutData.nama_sekolah}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Judul</th>
                        <td className="border px-2 py-1 max-w-[200px] truncate">{aboutData.judul}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Sub Judul</th>
                        <td className="border px-2 py-1 max-w-[200px] truncate">{aboutData.sub_judul}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">About</th>
                        <td className="border px-2 py-1 max-w-[200px] truncate">{aboutData.about}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Deskripsi</th>
                        <td className="border px-2 py-1 max-w-[200px] truncate">{aboutData.deskripsi}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Alamat</th>
                        <td className="border px-2 py-1 max-w-[200px] truncate">{aboutData.alamat}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">No. HP</th>
                        <td className="border px-2 py-1">{aboutData.no_hp}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Website</th>
                        <td className="border px-2 py-1">
                            <a href={aboutData.website} target="_blank" rel="noopener noreferrer"
                                className="text-blue-600 underline">
                                {aboutData.website}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Email</th>
                        <td className="border px-2 py-1">{aboutData.email}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Instagram</th>
                        <td className="border px-2 py-1">{aboutData.instagram}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Jam Operasional 1</th>
                        <td className="border px-2 py-1">{aboutData.jam_operasional_1}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Jam Operasional 2</th>
                        <td className="border px-2 py-1">{aboutData.jam_operasional_2}</td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Maps</th>
                        <td className="border px-2 py-1">
                            {aboutData.maps ? (
                            <iframe src={aboutData.maps} width="150" height="150" style={{ border: 0 }}
                                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            ) : (
                            <span className="text-gray-500 italic">Tidak ada Maps</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Logo Sekolah</th>
                        <td className="border px-2 py-1">
                            <img src={`/storage/${aboutData.logo_sekolah}`} alt="Logo Sekolah"
                                className="w-12 h-12 mx-auto" />
                        </td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Profil Sekolah</th>
                        <td className="border px-2 py-1">
                            <img src={`/storage/${aboutData.gambar}`} alt="Profil Sekolah"
                                className="w-100 h-12 mx-auto" />
                        </td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Gambar Struktur</th>
                        <td className="border px-2 py-1">
                            <img src={`/storage/${aboutData.gambar_struktur}`}  alt="Gambar Struktur"
                                className="w-100 h-100 mx-auto" />
                        </td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Barcode</th>
                        <td className="border px-2 py-1">
                            <img src={`/storage/${aboutData.barcode}`} alt="Barcode" className="w-12 h-12 mx-auto" />
                        </td>
                    </tr>
                    <tr>
                        <th className="px-4 py-2 border">Copyright</th>
                        <td className="border px-2 py-1">{aboutData.copyright}</td>
                    </tr>

                </>
                ) : (
                <tr>
                    <td colSpan="19" className="text-center p-4">Tidak ada data</td>
                </tr>
                )}
            </tbody>
        </table>
    </div>

    {/* Modal */}
    {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button onClick={()=> setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
                >
                &times;
            </button>

            <h2 className="text-xl font-bold mb-4">
                {isEditing ? "Edit Data Sekolah" : "Tambah Data Sekolah"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Nama Sekolah</label>
                    <input type="text" value={data.nama_sekolah} onChange={(e)=> setData("nama_sekolah",
                    e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Masukkan Nama Sekolah"
                    />
                </div>

                <div>
                    <label className="block font-medium">Judul</label>
                    <input type="text" value={data.judul} onChange={(e)=> setData("judul", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Masukkan Judul"
                    />
                </div>

                <div>
                    <label className="block font-medium">Judul 2</label>
                    <input type="text" value={data.sub_judul} onChange={(e)=> setData("sub_judul", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Masukkan Judul 2"
                    />
                </div>

                <div>
                    <label className="block font-medium">About</label>
                    <textarea rows="4" value={data.about} onChange={(e)=> setData("about", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Masukkan About"
                    />
                </div>

                <div>
                    <label className="block font-medium">Deskripsi Sekolah</label>
                    <textarea rows="4"  value={data.deskripsi} onChange={(e)=> setData("deskripsi", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Masukkan Deskripsi"
                    />
                </div>

                <div>
                    <label className="block font-medium">Alamat</label>
                    <textarea rows="4" value={data.alamat} onChange={(e)=> setData("alamat", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Masukkan Alamat"
                    />
                </div>

                <div>
                    <label className="block font-medium">No. HP</label>
                    <input type="text"  value={data.no_hp} onChange={(e)=> setData("no_hp", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Masukkan No. HP"
                    />
                </div>

                <div>
                    <label className="block font-medium">Link Website</label>
                    <input type="text" value={data.website} onChange={(e)=> setData("website", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Masukkan Link Website"
                    />
                </div>

                <div>
                    <label className="block font-medium">Email</label>
                    <input type="email" value={data.email} onChange={(e)=> setData("email", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Masukkan Email"
                    />
                </div>

                <div>
                    <label className="block font-medium">Instagram</label>
                    <input type="text" value={data.instagram} onChange={(e)=> setData("instagram", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Masukkan Instagram"
                    />
                </div>

                <div>
                    <label className="block font-medium">Jam Operasional 1</label>
                    <input type="text" value={data.jam_operasional_1} onChange={(e)=> setData("jam_operasional_1",
                    e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Contoh: Senin - Jumat: 07.00 - 13.00 WIB"
                    />
                </div>

                <div>
                    <label className="block font-medium">Jam Operasional 2</label>
                    <input type="text" value={data.jam_operasional_2} onChange={(e)=> setData("jam_operasional_2",
                    e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Contoh: Sabtu - Minggu: Libur"
                    />
                </div>

                <div>
                    <label className="block font-medium">Maps</label>
                    <textarea rows="5"  type="text" value={data.maps} onChange={(e)=> setData("maps", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Contoh: https://www.google.com/maps/embed?pb=... (ambil dari atribut src iframe Google
                    Maps)"
                    />
                </div>

                <div>
                    <label className="block font-medium">Copyright</label>
                    <input type="text" value={data.copyright} onChange={(e)=> setData("copyright", e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Masukkan Copyright"
                    />
                </div>

                <div>
                    <label className="block font-medium">Logo Sekolah</label>
                    <input type="file" accept="image/*" onChange={(e)=> setData("logo_sekolah", e.target.files[0])}
                    className="w-full border px-4 py-2 rounded-md"
                    />
                </div>

                <div>
                    <label className="block font-medium">Profil Sekolah</label>
                    <input type="file" accept="image/*" onChange={(e)=> setData("gambar", e.target.files[0])}
                    className="w-full border px-4 py-2 rounded-md"
                    />
                </div>

               <div>
  <label className="block font-medium">Gambar Struktur</label>

  {/* Tampilkan preview jika ada */}

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setData("gambar_struktur", e.target.files[0])}
    className="w-full border px-4 py-2 rounded-md"
    />
    {previewStruktur && (
      <div className="mb-2">
        <p className="text-sm text-gray-600">Preview Gambar Struktur:</p>
        <img src={previewStruktur} alt="Preview" className="size-1/6 rounded border" />
      </div>
    )}
</div>


                <div>
                    <label className="block font-medium">Barcode</label>
                    <input type="file" accept="image/*" onChange={(e)=> setData("barcode", e.target.files[0])}
                    className="w-full border px-4 py-2 rounded-md"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={()=> setShowModal(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                        Batal
                    </button>
                    <button type="submit" disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
    )}
</div>
);
};

AboutAdmin.layout = (page) => (
<AdminLayout aboutData={page.props.aboutData}>
    {page}
</AdminLayout>
);

export default AboutAdmin;
