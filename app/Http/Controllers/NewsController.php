<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\About;

class NewsController extends Controller
{
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'desc' => 'nullable|string',
            'content' => 'required|string', // Pastikan content diinput sebagai string
            'cover' => 'nullable|image|max:2048',
        ]);

        // Upload file jika ada
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('covers', 'public');
        }

        // Bersihkan tag HTML dari content menggunakan strip_tags
        $cleanContent = strip_tags($validated['content']);

        // Simpan data ke database
        News::create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'short_description' => $validated['desc'],
            'content' => $cleanContent, // Simpan content yang sudah dibersihkan dari tag HTML
            'cover' => $coverPath ?? null,
        ]);

        return redirect()->back()->with('success', 'Berita berhasil ditambahkan!');
    }

    public function show($id)
    {
        $news = News::findOrFail($id);
        $aboutData = About::latest()->first(); // Ambil data terbaru dari tabel about
        return Inertia::render('SinglePostPage', [
            'news' => $news,
            'aboutData' => $aboutData,
        ]);
    }

    public function index()
    {
        $news = News::latest()->get();
        $aboutData = About::latest()->first(); // Ambil data terbaru dari tabel about
        return Inertia::render('News', [
            'newsList' => $news,
            'aboutData' => $aboutData,
        ]);
    }

    public function indexHome()
    {
        $news = News::latest()->get();
        $aboutData = About::latest()->first(); // Ambil data terbaru dari tabel about
        return Inertia::render('HomePage', [
            'news' => $news,
            'aboutData' => $aboutData,
        ]);
    }

    public function indexAdmin()
    {
        $news = News::latest()->paginate(3);
        $aboutData = About::latest()->first(); // Ambil data terbaru dari tabel about
        return Inertia::render('admin/NewsIndex', [
            'news' => $news,
            'aboutData' => $aboutData,
        ]);
    }

    // Menampilkan form untuk mengedit berita
    public function edit($id)
    {
        $news = News::findOrFail($id);
        $aboutData = About::latest()->first(); // Ambil data terbaru dari tabel about
        return Inertia::render('admin/EditNews', [
            'news' => $news,
            'aboutData' => $aboutData,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'short_description' => 'required|string',
            'content' => 'required|string',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Optional cover image validation
        ]);

        $news = News::findOrFail($id);

        // Update the data
        $news->update([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'short_description' => $validated['short_description'],
            'content' => $validated['content'],
        ]);

        // If there's a new cover, upload it
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('covers', 'public');
            $news->cover = $coverPath;
            $news->save();
        }

        return redirect()->route('news.index')->with('success', 'News updated successfully!');
    }

    // Menghapus berita
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();

        return redirect()->route('news.index')->with('success', 'Berita berhasil dihapus.');
    }
}
