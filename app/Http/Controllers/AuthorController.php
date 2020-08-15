<?php

namespace App\Http\Controllers;

use App\Authors;

class AuthorController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'getAuthorByName']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id = false)
    {
        $data = $id ? Authors::with('books')->where('id', '=', $id)->get() : Authors::with('books')->get();
        return response()->json([
            'status' => 200,
            'message' => "Berhasil Menampilkan Database.",
            'data' => $data,
        ], 200);
    }

    public function getAuthorByName()
    {
        $param = request()->input('name');
        $data = Authors::where('first_name', 'LIKE', '%' . $param . '%')->orWhere('middle_name', 'LIKE', '%' . $param . '%')->orWhere('last_name', 'LIKE', '%' . $param . '%')->get();
        return response()->json([
            'status' => 200,
            'message' => "Berhasil Menampilkan Database.",
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
            'first_name' => 'required|string',
            'middle_name' => 'required|string',
            'last_name' => 'required|string',
        ]);

        if ($id) {
            $find = Authors::find($id);
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
            Authors::create(array_merge($data));
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
     * @param  \App\Author  $author
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $find = Authors::find($id);
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
