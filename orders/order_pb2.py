# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: order.proto
# Protobuf Python Version: 4.25.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0border.proto\x12\x14\x62ook_ordering_system\"`\n\x12\x43reateOrderRequest\x12\x15\n\rcustomer_name\x18\x01 \x01(\t\x12\x12\n\nbook_title\x18\x02 \x01(\t\x12\x10\n\x08quantity\x18\x03 \x01(\x05\x12\r\n\x05price\x18\x04 \x01(\x02\"\'\n\x13\x43reateOrderResponse\x12\x10\n\x08order_id\x18\x01 \x01(\t\"#\n\x0fGetOrderRequest\x12\x10\n\x08order_id\x18\x01 \x01(\t\"^\n\x10GetOrderResponse\x12\x15\n\rcustomer_name\x18\x01 \x01(\t\x12\x12\n\nbook_title\x18\x02 \x01(\t\x12\x10\n\x08quantity\x18\x03 \x01(\x05\x12\r\n\x05price\x18\x04 \x01(\x02\"r\n\x12UpdateOrderRequest\x12\x10\n\x08order_id\x18\x01 \x01(\t\x12\x15\n\rcustomer_name\x18\x02 \x01(\t\x12\x12\n\nbook_title\x18\x03 \x01(\t\x12\x10\n\x08quantity\x18\x04 \x01(\x05\x12\r\n\x05price\x18\x05 \x01(\x02\"\x15\n\x13UpdateOrderResponse\"&\n\x12\x44\x65leteOrderRequest\x12\x10\n\x08order_id\x18\x01 \x01(\t\"\x15\n\x13\x44\x65leteOrderResponse\"\x13\n\x11ListOrdersRequest\"L\n\x12ListOrdersResponse\x12\x36\n\x06orders\x18\x01 \x03(\x0b\x32&.book_ordering_system.GetOrderResponse2\x80\x04\n\x0cOrderService\x12\x64\n\x0b\x43reateOrder\x12(.book_ordering_system.CreateOrderRequest\x1a).book_ordering_system.CreateOrderResponse\"\x00\x12[\n\x08GetOrder\x12%.book_ordering_system.GetOrderRequest\x1a&.book_ordering_system.GetOrderResponse\"\x00\x12\x64\n\x0bUpdateOrder\x12(.book_ordering_system.UpdateOrderRequest\x1a).book_ordering_system.UpdateOrderResponse\"\x00\x12\x64\n\x0b\x44\x65leteOrder\x12(.book_ordering_system.DeleteOrderRequest\x1a).book_ordering_system.DeleteOrderResponse\"\x00\x12\x61\n\nListOrders\x12\'.book_ordering_system.ListOrdersRequest\x1a(.book_ordering_system.ListOrdersResponse\"\x00\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'order_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  DESCRIPTOR._options = None
  _globals['_CREATEORDERREQUEST']._serialized_start=37
  _globals['_CREATEORDERREQUEST']._serialized_end=133
  _globals['_CREATEORDERRESPONSE']._serialized_start=135
  _globals['_CREATEORDERRESPONSE']._serialized_end=174
  _globals['_GETORDERREQUEST']._serialized_start=176
  _globals['_GETORDERREQUEST']._serialized_end=211
  _globals['_GETORDERRESPONSE']._serialized_start=213
  _globals['_GETORDERRESPONSE']._serialized_end=307
  _globals['_UPDATEORDERREQUEST']._serialized_start=309
  _globals['_UPDATEORDERREQUEST']._serialized_end=423
  _globals['_UPDATEORDERRESPONSE']._serialized_start=425
  _globals['_UPDATEORDERRESPONSE']._serialized_end=446
  _globals['_DELETEORDERREQUEST']._serialized_start=448
  _globals['_DELETEORDERREQUEST']._serialized_end=486
  _globals['_DELETEORDERRESPONSE']._serialized_start=488
  _globals['_DELETEORDERRESPONSE']._serialized_end=509
  _globals['_LISTORDERSREQUEST']._serialized_start=511
  _globals['_LISTORDERSREQUEST']._serialized_end=530
  _globals['_LISTORDERSRESPONSE']._serialized_start=532
  _globals['_LISTORDERSRESPONSE']._serialized_end=608
  _globals['_ORDERSERVICE']._serialized_start=611
  _globals['_ORDERSERVICE']._serialized_end=1123
# @@protoc_insertion_point(module_scope)