export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      kepmen_900_keg: {
        Row: {
          created_at: string | null
          id: string
          indikator_900keg: string[] | null
          kode_rek_900keg: string
          program_id: string | null
          sasaran_900keg: string[] | null
          satuan_900keg: string | null
          updated_at: string | null
          uraian_900keg: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          indikator_900keg?: string[] | null
          kode_rek_900keg: string
          program_id?: string | null
          sasaran_900keg?: string[] | null
          satuan_900keg?: string | null
          updated_at?: string | null
          uraian_900keg: string
        }
        Update: {
          created_at?: string | null
          id?: string
          indikator_900keg?: string[] | null
          kode_rek_900keg?: string
          program_id?: string | null
          sasaran_900keg?: string[] | null
          satuan_900keg?: string | null
          updated_at?: string | null
          uraian_900keg?: string
        }
        Relationships: [
          {
            foreignKeyName: "kepmen_900_keg_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "kepmen_900_prog"
            referencedColumns: ["id"]
          },
        ]
      }
      kepmen_900_prog: {
        Row: {
          created_at: string | null
          id: string
          indikator_900prog: string[] | null
          kode_rek_900prog: string
          sasaran_900prog: string[] | null
          satuan_900prog: string | null
          updated_at: string | null
          uraian_900prog: string
          urusan_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          indikator_900prog?: string[] | null
          kode_rek_900prog: string
          sasaran_900prog?: string[] | null
          satuan_900prog?: string | null
          updated_at?: string | null
          uraian_900prog: string
          urusan_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          indikator_900prog?: string[] | null
          kode_rek_900prog?: string
          sasaran_900prog?: string[] | null
          satuan_900prog?: string | null
          updated_at?: string | null
          uraian_900prog?: string
          urusan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kepmen_900_prog_urusan_id_fkey"
            columns: ["urusan_id"]
            isOneToOne: false
            referencedRelation: "kepmen_900_urusan"
            referencedColumns: ["id"]
          },
        ]
      }
      kepmen_900_subkeg: {
        Row: {
          created_at: string | null
          id: string
          indikator_900subkeg: string[] | null
          kegiatan_id: string | null
          kode_rek_900subkeg: string
          sasaran_900subkeg: string[] | null
          satuan_900subkeg: string | null
          updated_at: string | null
          uraian_900subkeg: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          indikator_900subkeg?: string[] | null
          kegiatan_id?: string | null
          kode_rek_900subkeg: string
          sasaran_900subkeg?: string[] | null
          satuan_900subkeg?: string | null
          updated_at?: string | null
          uraian_900subkeg: string
        }
        Update: {
          created_at?: string | null
          id?: string
          indikator_900subkeg?: string[] | null
          kegiatan_id?: string | null
          kode_rek_900subkeg?: string
          sasaran_900subkeg?: string[] | null
          satuan_900subkeg?: string | null
          updated_at?: string | null
          uraian_900subkeg?: string
        }
        Relationships: [
          {
            foreignKeyName: "kepmen_900_subkeg_kegiatan_id_fkey"
            columns: ["kegiatan_id"]
            isOneToOne: false
            referencedRelation: "kepmen_900_keg"
            referencedColumns: ["id"]
          },
        ]
      }
      kepmen_900_urusan: {
        Row: {
          created_at: string | null
          id: string
          kode_rek_900urusan: string
          updated_at: string | null
          uraian_900urusan: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          kode_rek_900urusan: string
          updated_at?: string | null
          uraian_900urusan: string
        }
        Update: {
          created_at?: string | null
          id?: string
          kode_rek_900urusan?: string
          updated_at?: string | null
          uraian_900urusan?: string
        }
        Relationships: []
      }
      renstra_keg: {
        Row: {
          created_at: string | null
          id: string
          program_id: string | null
          renstra_anggarann1_keg: number | null
          renstra_anggarann2_keg: number | null
          renstra_anggarann3_keg: number | null
          renstra_anggarann4_keg: number | null
          renstra_indikator_keg: string[] | null
          renstra_kode_rek_keg: string
          renstra_sasaran_keg: string[] | null
          renstra_satuan_keg: string | null
          renstra_targetn1_keg: string | null
          renstra_targetn2_keg: string | null
          renstra_targetn3_keg: string | null
          renstra_targetn4_keg: string | null
          renstra_uraian_keg: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          program_id?: string | null
          renstra_anggarann1_keg?: number | null
          renstra_anggarann2_keg?: number | null
          renstra_anggarann3_keg?: number | null
          renstra_anggarann4_keg?: number | null
          renstra_indikator_keg?: string[] | null
          renstra_kode_rek_keg: string
          renstra_sasaran_keg?: string[] | null
          renstra_satuan_keg?: string | null
          renstra_targetn1_keg?: string | null
          renstra_targetn2_keg?: string | null
          renstra_targetn3_keg?: string | null
          renstra_targetn4_keg?: string | null
          renstra_uraian_keg: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          program_id?: string | null
          renstra_anggarann1_keg?: number | null
          renstra_anggarann2_keg?: number | null
          renstra_anggarann3_keg?: number | null
          renstra_anggarann4_keg?: number | null
          renstra_indikator_keg?: string[] | null
          renstra_kode_rek_keg?: string
          renstra_sasaran_keg?: string[] | null
          renstra_satuan_keg?: string | null
          renstra_targetn1_keg?: string | null
          renstra_targetn2_keg?: string | null
          renstra_targetn3_keg?: string | null
          renstra_targetn4_keg?: string | null
          renstra_uraian_keg?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "renstra_keg_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "renstra_prog"
            referencedColumns: ["id"]
          },
        ]
      }
      renstra_prog: {
        Row: {
          created_at: string | null
          id: string
          renstra_anggarann1_prog: number | null
          renstra_anggarann2_prog: number | null
          renstra_anggarann3_prog: number | null
          renstra_anggarann4_prog: number | null
          renstra_indikator_prog: string[] | null
          renstra_kode_rek_prog: string
          renstra_sasaran_prog: string[] | null
          renstra_satuan_prog: string | null
          renstra_targetn1_prog: string | null
          renstra_targetn2_prog: string | null
          renstra_targetn3_prog: string | null
          renstra_targetn4_prog: string | null
          renstra_uraian_prog: string
          updated_at: string | null
          urusan_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          renstra_anggarann1_prog?: number | null
          renstra_anggarann2_prog?: number | null
          renstra_anggarann3_prog?: number | null
          renstra_anggarann4_prog?: number | null
          renstra_indikator_prog?: string[] | null
          renstra_kode_rek_prog: string
          renstra_sasaran_prog?: string[] | null
          renstra_satuan_prog?: string | null
          renstra_targetn1_prog?: string | null
          renstra_targetn2_prog?: string | null
          renstra_targetn3_prog?: string | null
          renstra_targetn4_prog?: string | null
          renstra_uraian_prog: string
          updated_at?: string | null
          urusan_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          renstra_anggarann1_prog?: number | null
          renstra_anggarann2_prog?: number | null
          renstra_anggarann3_prog?: number | null
          renstra_anggarann4_prog?: number | null
          renstra_indikator_prog?: string[] | null
          renstra_kode_rek_prog?: string
          renstra_sasaran_prog?: string[] | null
          renstra_satuan_prog?: string | null
          renstra_targetn1_prog?: string | null
          renstra_targetn2_prog?: string | null
          renstra_targetn3_prog?: string | null
          renstra_targetn4_prog?: string | null
          renstra_uraian_prog?: string
          updated_at?: string | null
          urusan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "renstra_prog_urusan_id_fkey"
            columns: ["urusan_id"]
            isOneToOne: false
            referencedRelation: "renstra_urusan"
            referencedColumns: ["id"]
          },
        ]
      }
      renstra_subkeg: {
        Row: {
          created_at: string | null
          id: string
          kegiatan_id: string | null
          renstra_anggarann1_subkeg: number | null
          renstra_anggarann2_subkeg: number | null
          renstra_anggarann3_subkeg: number | null
          renstra_anggarann4_subkeg: number | null
          renstra_indikator_subkeg: string[] | null
          renstra_kode_rek_subkeg: string
          renstra_sasaran_subkeg: string[] | null
          renstra_satuan_subkeg: string | null
          renstra_targetn1_subkeg: string | null
          renstra_targetn2_subkeg: string | null
          renstra_targetn3_subkeg: string | null
          renstra_targetn4_subkeg: string | null
          renstra_uraian_subkeg: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          kegiatan_id?: string | null
          renstra_anggarann1_subkeg?: number | null
          renstra_anggarann2_subkeg?: number | null
          renstra_anggarann3_subkeg?: number | null
          renstra_anggarann4_subkeg?: number | null
          renstra_indikator_subkeg?: string[] | null
          renstra_kode_rek_subkeg: string
          renstra_sasaran_subkeg?: string[] | null
          renstra_satuan_subkeg?: string | null
          renstra_targetn1_subkeg?: string | null
          renstra_targetn2_subkeg?: string | null
          renstra_targetn3_subkeg?: string | null
          renstra_targetn4_subkeg?: string | null
          renstra_uraian_subkeg: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          kegiatan_id?: string | null
          renstra_anggarann1_subkeg?: number | null
          renstra_anggarann2_subkeg?: number | null
          renstra_anggarann3_subkeg?: number | null
          renstra_anggarann4_subkeg?: number | null
          renstra_indikator_subkeg?: string[] | null
          renstra_kode_rek_subkeg?: string
          renstra_sasaran_subkeg?: string[] | null
          renstra_satuan_subkeg?: string | null
          renstra_targetn1_subkeg?: string | null
          renstra_targetn2_subkeg?: string | null
          renstra_targetn3_subkeg?: string | null
          renstra_targetn4_subkeg?: string | null
          renstra_uraian_subkeg?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "renstra_subkeg_kegiatan_id_fkey"
            columns: ["kegiatan_id"]
            isOneToOne: false
            referencedRelation: "renstra_keg"
            referencedColumns: ["id"]
          },
        ]
      }
      renstra_urusan: {
        Row: {
          created_at: string | null
          id: string
          renstra_anggarann1_urusan: number | null
          renstra_anggarann2_urusan: number | null
          renstra_anggarann3_urusan: number | null
          renstra_anggarann4_urusan: number | null
          renstra_indikator_urusan: string[] | null
          renstra_kode_rek_urusan: string
          renstra_sasaran_urusan: string[] | null
          renstra_satuan_urusan: string | null
          renstra_targetn1_urusan: string | null
          renstra_targetn2_urusan: string | null
          renstra_targetn3_urusan: string | null
          renstra_targetn4_urusan: string | null
          renstra_uraian_urusan: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          renstra_anggarann1_urusan?: number | null
          renstra_anggarann2_urusan?: number | null
          renstra_anggarann3_urusan?: number | null
          renstra_anggarann4_urusan?: number | null
          renstra_indikator_urusan?: string[] | null
          renstra_kode_rek_urusan: string
          renstra_sasaran_urusan?: string[] | null
          renstra_satuan_urusan?: string | null
          renstra_targetn1_urusan?: string | null
          renstra_targetn2_urusan?: string | null
          renstra_targetn3_urusan?: string | null
          renstra_targetn4_urusan?: string | null
          renstra_uraian_urusan: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          renstra_anggarann1_urusan?: number | null
          renstra_anggarann2_urusan?: number | null
          renstra_anggarann3_urusan?: number | null
          renstra_anggarann4_urusan?: number | null
          renstra_indikator_urusan?: string[] | null
          renstra_kode_rek_urusan?: string
          renstra_sasaran_urusan?: string[] | null
          renstra_satuan_urusan?: string | null
          renstra_targetn1_urusan?: string | null
          renstra_targetn2_urusan?: string | null
          renstra_targetn3_urusan?: string | null
          renstra_targetn4_urusan?: string | null
          renstra_uraian_urusan?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
