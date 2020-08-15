<?php

namespace App\Http\Controllers;

use App\Books;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    /**
     * Menampilkan Semua Data dan Juga Detail Data dari Database.
     *
     * @return JSON
     */
    public function index($id = false)
    {
        $query = Books::with(['authors' => function ($q) {
            $q->select('authors.id as value', DB::raw("CONCAT(first_name,' ', middle_name,' ',last_name) AS label"));
        }]);
        $data = $id ? $query->where('id', '=', $id)->get() : $query->get();
        return response()->json([
            'status' => 200,
            'message' => "Berhasil Menampilkan Database.",
            'data' => $data,
        ], 200);
    }

    /**
     * Menyimpan dan Juga Memperbarui Record Ke Dalam Database.
     *
     * @param  $id
     * @return JSON
     */
    public function store($id = false)
    {
        $data = request()->validate([
            'title' => 'required|string',
            'total_pages' => 'required|integer',
            'rating' => 'required|integer',
            'isbn' => 'required|integer',
            'published_date' => 'required|date',
            'authors' => ''
        ]);

        if ($id) {
            $book = Books::find($id);
            if ($book) {
                $book->update($data);
                $book->authors()->sync($data['authors']);

                return response()->json([
                    'status' => $id ? 200 : 201,
                    'message' => "Berhasil mengubah data",
                    'data' => $data
                ]);
            }

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan"
            ]);
        } else {
            $book = Books::create($data);
            $book->authors()->attach($data['authors']);
        }

        return response()->json([
            'status' => $id ? 200 : 201,
            'message' => "Berhasil menambah data",
            'data' => $data
        ]);
    }

    /**
     * Menghapus Record Dari Database.
     *
     * @param  $id
     * @return JSON
     */
    public function destroy($id)
    {
        $find = Books::find($id);
        if ($find) {
            $find->authors()->detach();
            $find->delete();
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan.",
            ]);
        }

        return response()->json([
            'status' => 200,
            'message' => "Berhasil menghapus data",
        ]);
    }
}
