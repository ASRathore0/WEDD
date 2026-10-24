<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RsvpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'guest_name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['nullable', 'email', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'attendance_status' => ['required', 'in:attending,declined,tentative'],
            'guest_count' => ['required', 'integer', 'min:1', 'max:10'],
            'selected_events' => ['nullable', 'array'],
            'selected_events.*' => ['string', 'max:100'],
            'dietary_notes' => ['nullable', 'string', 'max:500'],
            'message' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'guest_name.required' => 'Please provide your full name.',
            'attendance_status.required' => 'Please indicate your attendance status.',
            'guest_count.min' => 'Number of guests must be at least 1.',
            'guest_count.max' => 'Maximum allowed guests per party is 10.',
        ];
    }
}
