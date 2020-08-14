<?php

namespace App\Http\Controllers;

use App\Authors;
use App\Books;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id = false)
    {
        $data = $id ? Books::with('authors')->where('id', '=', $id)->get() : Books::with('authors')->get();
        return response()->json([
            'status' => 200,
            'message' => "Berhasil Mengambil Menampilkan Database.",
            'data' => $data,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($id = false)
    {
        $data = request()->validate([
            'title' => 'required|string',
            'total_pages' => 'required|integer',
            'rating' => 'required|integer',
            'isbn' => 'required|integer',
            'published_date' => 'required|date',
            'author' => ''
        ]);

        if ($id) {
            $find = Books::find($id);
            if ($find) {
                $find->update($data);

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
            $book = new Books;
            $book->title = $data['title'];
            $book->total_pages = $data['total_pages'];
            $book->rating = $data['rating'];
            $book->isbn = $data['isbn'];
            $book->published_date = $data['published_date'];
            $book->save();

            $author = Authors::find($data['author']);
            $book->authors()->attach($author);
        }

        return response()->json([
            'status' => $id ? 200 : 201,
            'message' => "Berhasil menambah data",
            'data' => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $find = Books::find($id);
        if ($find) {
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
